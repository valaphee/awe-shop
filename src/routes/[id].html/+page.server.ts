import type { PageServerLoad } from './$types';
import { sql } from 'bun';

export const load: PageServerLoad = async ({ params }) => {
	const item = (
		await sql`select name
							from item
							where id = ${params.id}`.values()
	)[0];
	const shops = await sql`select distinct on (list.shop) shop.name
							from list
										 join shop on list.shop = shop.id
							where item = ${params.id}`.values();
	return {
		item: {
			name: item[0]
		},
		shops: shops.map((shop) => ({
			name: shop[0]
		}))
	};
};
