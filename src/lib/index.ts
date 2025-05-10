import FontAwesomeIcon from './FontAwesomeIcon.svelte';
import * as s3 from './s3';

export { s3, FontAwesomeIcon };

export const debounce = (callback: Function, wait = 250) => {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			callback(...args);
		}, wait);
	};
};
