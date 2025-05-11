import type { RequestHandler } from '@sveltejs/kit';
import { sql } from 'bun';

export const GET: RequestHandler = async ({ request }) => {
	const products = await sql`select id from product`.values();
	const host = request.headers.get('host');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">${products.map((product) => `<url><loc>http://${host}/${product[0]}.html</loc></url>`).join('')}</urlset>`,
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
};
