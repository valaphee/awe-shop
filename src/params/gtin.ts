import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string) => Number.isInteger(Number(param))) satisfies ParamMatcher;
