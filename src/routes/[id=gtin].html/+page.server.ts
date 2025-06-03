import type { PageServerLoad } from './$types';

import { sql } from 'bun';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, params }) => {
	const [item] = await sql`select name, image from item where id = ${params.id}`;
	if (!item) error(404, 'Not Found');
	const shops =
		await sql`select shop.name, list.url from list join shop on list.shop = shop.id where item = ${params.id}`;
	return {
		back: request.headers.get('referer') ?? '/',
		item: {
			name: item.name,
			image: item.image
		},
		shops: shops.map((shop) => ({
			name: shop.name,
			url: shop.url
		}))
	};
};
