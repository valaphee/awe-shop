<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data }: LayoutProps = $props();

	import { browser } from '$app/environment';

	import { FontAwesomeIcon } from '$lib';
	import { faArrowLeft, faImage } from '@fortawesome/free-solid-svg-icons';
</script>

<svelte:head>
	<title>{data.product.name}</title>
</svelte:head>

<button
	class="p-2.5"
	onclick={() => {
		if (browser) window.history.back();
	}}
>
	<FontAwesomeIcon icon={faArrowLeft} class="w-4 h-4" />
</button>

<FontAwesomeIcon icon={faImage} class="aspect-square h-auto" />
<h1 class="text-center">{data.product.name}</h1>

<div>
	{#each data.shops as shop (shop.name)}
		<div>
			{shop.name}
		</div>
	{/each}
</div>
