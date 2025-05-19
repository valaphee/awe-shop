import type { PageServerLoad } from './$types';
import { sql } from 'bun';

export const load: PageServerLoad = async ({ params }) => {
	const item = (
		await sql`select name, image
							from item
							where id = ${params.id}`
	)[0];
	const shops = await sql`select shop.name, list.url
							from list
										 join shop on list.shop = shop.id
							where item = ${params.id}`;
	return {
		item: {
			name: item.name,
			image: item.image,
		},
		shops: shops.map((shop) => ({
			name: shop.name,
			url: shop.url
		}))
	};
};
