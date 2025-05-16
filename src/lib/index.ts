import FontAwesomeIcon from './FontAwesomeIcon.svelte';

export { FontAwesomeIcon };

export const debounce = (callback: Function, wait = 250) => {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			callback(...args);
		}, wait);
	};
};
