<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data }: LayoutProps = $props();

	import { page } from '$app/state';

	import { onMount } from 'svelte';
	import { FontAwesomeIcon, debounce } from '$lib';
	import { faImage, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

	let form: HTMLFormElement;
	let input: HTMLInputElement;

	onMount(() => {
		input.value = page.url.searchParams.get('q');
	});
</script>

<svelte:head>
	<title></title>
</svelte:head>

<form
	bind:this={form}
	data-sveltekit-replacestate
	data-sveltekit-keepfocus
	data-sveltekit-noscroll
	autocomplete="off"
>
	<div class="relative">
		<input
			bind:this={input}
			type="search"
			name="q"
			class="w-full p-2.5 text-sm"
			oninput={debounce(() => form.requestSubmit())}
		/>
		<button type="submit" class="absolute top-0 end-0 h-full p-2.5 text-sm font-medium">
			<FontAwesomeIcon icon={faMagnifyingGlass} class="w-4 h-4" />
			<span class="sr-only">Search</span>
		</button>
	</div>
</form>

<div class="grid grid-cols-2">
	{#each data.products as product (product.id)}
		<a href="/{product.id}.html" class="p-2.5">
			{#if product.image}
				<img src={product.image} class="aspect-square h-auto" />
			{:else}
				<FontAwesomeIcon icon={faImage} class="aspect-square h-auto" />
			{/if}
			<h3 class="text-center">{product.name}</h3>
		</a>
	{/each}
</div>
