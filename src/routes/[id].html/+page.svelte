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

{#if data.product.image}
	<img src={data.product.image} class="aspect-square h-auto" />
{:else}
	<FontAwesomeIcon icon={faImage} class="aspect-square h-auto" />
{/if}
<h1 class="text-center">{data.product.name}</h1>

<div>
	{#each data.merchants as merchant (merchant.name)}
		<div>
			<a target="_blank" href={merchant.url}>{merchant.name}</a>
		</div>
	{/each}
</div>
