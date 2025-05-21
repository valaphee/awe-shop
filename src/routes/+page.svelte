<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data }: LayoutProps = $props();

	import { page } from '$app/state';

	import { onMount } from 'svelte';
	import { FontAwesomeIcon, locale, debounce } from '$lib';
	import { faImage, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

	let form: HTMLFormElement;
	let input: HTMLInputElement;

	onMount(() => {
		input.value = page.url.searchParams.get('q');
	});
</script>

<svelte:head>
	<title>{$locale.search}</title>
</svelte:head>

<form
	bind:this={form}
	data-sveltekit-replacestate
	data-sveltekit-keepfocus
	data-sveltekit-noscroll
	autocomplete="off"
	class="fixed w-full"
>
	<div class="relative">
		<input
			bind:this={input}
			type="search"
			name="q"
			oninput={debounce(() => form.requestSubmit())}
			class="w-full p-2.5 text-sm"
		/>
		<button type="submit" class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium">
			<FontAwesomeIcon icon={faMagnifyingGlass} class="w-4 h-4" />
			<span class="sr-only">{$locale.search}</span>
		</button>
	</div>
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
