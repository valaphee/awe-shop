import type { RequestHandler } from '@sveltejs/kit';
import { sql } from 'bun';

export const GET: RequestHandler = async ({ request }) => {
	const host = request.headers.get('host');
	const items = await sql`select id from item`;
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">${items.map((item) => `<url><loc>http://${host}/${item.id}.html</loc></url>`).join('')}</urlset>`,
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
};
