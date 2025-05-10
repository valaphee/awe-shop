import type { RequestHandler } from '@sveltejs/kit';
import { sql } from 'bun';

export const GET: RequestHandler = async ({ request }) => {
	const articles = await sql`select id from article`.values();
	const host = request.headers.get('host');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">${articles.map((item) => `<url><loc>http://${host}/${item[0]}.html</loc></url>`).join('')}</urlset>`,
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
};
