import { writable } from 'svelte/store';

import de from './de.json';
import en from './en.json';

export const all = {
	de,
	en
} as {
	[locale: string]: typeof en;
};

export default writable(en);
