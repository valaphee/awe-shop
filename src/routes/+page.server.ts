import type { PageServerLoad } from './$types';
import { sql } from 'bun';

export const load: PageServerLoad = async ({ url }) => {
	const query = url.searchParams.get('q');
	const items = await sql`select id, name
							from item
							where name ilike ${`%${query}%`}`.values();
	return {
		items: items.map((item) => ({
			id: item[0],
			name: item[1]
		}))
	};
};
