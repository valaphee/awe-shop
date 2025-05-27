// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const preventDefault = (fn: Function) => {
	return (event: Event) => {
		event.preventDefault();
		fn(event);
	};
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, ms = 250) => {
	let timeout: ReturnType<typeof setTimeout>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn(...args);
		}, ms);
	};
};
