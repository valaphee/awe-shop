import { writable } from 'svelte/store';

import FontAwesomeIcon from './FontAwesomeIcon.svelte';
import locales from '../locales';

export { FontAwesomeIcon, locales };

export const debounce = (callback: Function, wait = 250) => {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			callback(...args);
		}, wait);
	};
};

export const locale = writable(locales.en);
