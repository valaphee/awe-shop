import type { PageServerLoad } from './$types';
import { sql } from 'bun';
import { s3 } from '$lib';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q');
	const products = await sql`select id, name, image
							from product
							where ts @@ websearch_to_tsquery('english', ${query})`.values();
	return {
		products: await Promise.all(
			products.map(async (product) => ({
				id: product[0],
				name: product[1],
				image: product[2] !== null ? await s3.presign(product[2]) : null
			}))
		)
	};
};
