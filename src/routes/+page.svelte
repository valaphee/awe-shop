<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data }: LayoutProps = $props();

	import { page } from '$app/state';

	import { FontAwesomeIcon, locale, debounce } from '$lib';
	import { faBarcode, faImage } from '@fortawesome/free-solid-svg-icons';

	let search: HTMLFormElement;
	const searchQuery = page.url.searchParams.get('q');
</script>

<svelte:head>
	<title>{$locale.search}</title>
</svelte:head>

<form
	bind:this={search}
	data-sveltekit-replacestate
	data-sveltekit-keepfocus
	data-sveltekit-noscroll
	autocomplete="off"
	class="sticky top-0 w-full"
>
	<input
		type="search"
		name="q"
		title={$locale.search}
		value={searchQuery}
		oninput={debounce(() => search.requestSubmit())}
		class="w-full p-2.5 text-sm"
	/>
	<button title={$locale.searchBarcode} class="absolute end-0 h-full p-2.5 text-sm font-medium">
		<FontAwesomeIcon icon={faBarcode} class="w-5 h-5" />
	</button>
</form>

<div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(13.75rem, 1fr))">
	{#each data.items as item (item.id)}
		<a href="/{item.id}.html" class="p-2.5">
			{#if item.image}
				<img loading="lazy" src="{item.image}?imwidth=304" alt="" class="h-40 w-40 m-auto" />
			{:else}
				<FontAwesomeIcon icon={faImage} class="h-40 w-40 m-auto" />
			{/if}
			<h3 class="text-center">{item.name}</h3>
		</a>
	{/each}
</div>
