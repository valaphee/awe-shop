import type { Handle } from '@sveltejs/kit';

import { locale, locales } from '$lib';

export const handle: Handle = async ({ event, resolve }) => {
	let lang = 'en';
	for (const prefLang in event.request.headers.get('accept-language')?.split(',')) {
		const prefLangCode = prefLang.split(';', 2)[0];
		if (locales[prefLangCode]) {
			lang = prefLangCode;
			locale.set(locales[prefLangCode]);
			break;
		}
	}
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
