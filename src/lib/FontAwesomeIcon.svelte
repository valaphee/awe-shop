<script lang="ts">
	import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

	export let icon: IconDefinition;
	$: i = (icon && icon.icon) || [0, 0, '', [], ''];

	let clazz: string | undefined = undefined;
	export { clazz as class };
</script>

{#if i[4]}
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {i[0]} {i[1]}" class={clazz}>
		{#if typeof i[4] == 'string'}
			<path d={i[4]} />
		{:else}
			<path d={i[4][0]} />
			<path d={i[4][1]} />
		{/if}
	</svg>
{/if}
