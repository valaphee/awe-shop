import type { Handle } from '@sveltejs/kit';

import { default as def, all } from '$lib/locales';

export const handle: Handle = async ({ event, resolve }) => {
	let lang = 'en';
	for (const prefLang in event.request.headers.get('accept-language')?.split(',')) {
		const prefLangCode = prefLang.split(';', 2)[0];
		if (all[prefLangCode]) {
			lang = prefLangCode;
			def.set(all[prefLangCode]);
			break;
		}
	}
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
