import type { PageServerLoad } from './$types';
import { sql } from 'bun';

export const load: PageServerLoad = async ({ url }) => {
	const name = url.searchParams.get('q');
	const tags = url.searchParams.get('t')?.split(',');
	const products =
		await sql`with tags as materialized (select array_agg(id) as ids from tag where name in (${sql(tags)}))
							select id, name
							from product
										 cross join tags
							where name ilike ${`%${name}%`}
								and product.tags @> tags.ids`.values();
	return {
		products: products.map((product) => ({
			id: product[0],
			name: product[1]
		}))
	};
};
