import type { PageServerLoad } from './$types';
import { sql } from 'bun';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q');
	const items = await sql`select id, name, image
							from item
							where name ilike ${`%${query}%`}`;
	return {
		items: items.map((item) => ({
			id: item.id,
			name: item.name,
			image: item.image,
		}))
	};
};
