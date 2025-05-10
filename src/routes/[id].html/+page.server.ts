import type { PageServerLoad } from './$types';
import { sql } from 'bun';
import { s3 } from '$lib';

export const load: PageServerLoad = async ({ params }) => {
	const product = (
		await sql`select name, image
							from product
							where id = ${params.id}`.values()
	)[0];
	const merchants =
		await sql`select distinct on (article.merchant) merchant.name, merchant.url, article.merchant_id
							from article
										 join merchant on article.merchant = merchant.id
							where product = ${params.id}`.values();
	return {
		product: {
			name: product[0],
			image: product[1] !== null ? await s3.presign(product[1]) : null
		},
		articles: articles.map((article) => ({
			name: article[0],
			url: article[1].replace('{id}', article[2])
		}))
	};
};
