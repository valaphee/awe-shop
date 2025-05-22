<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data }: LayoutProps = $props();

	import { FontAwesomeIcon, locale } from '$lib';
	import { faArrowLeft, faImage } from '@fortawesome/free-solid-svg-icons';
</script>

<svelte:head>
	<title>{data.item.name}</title>
	<meta name="description" content="" />
	<meta name="keywords" content="" />
</svelte:head>

<div class="sticky top-0 w-full">
	<a href={data.back} title={$locale.back} class="block p-2.5">
		<FontAwesomeIcon icon={faArrowLeft} class="w-5 h-5" />
	</a>
</div>

<div itemtype="https://schema.org/Product" itemscope>
	{#if data.item.image}
		<img itemprop="image" src={data.item.image} alt="" class="aspect-square h-auto" />
	{:else}
		<FontAwesomeIcon icon={faImage} class="aspect-square h-auto" />
	{/if}
	<h1 itemprop="name" class="text-center">{data.item.name}</h1>

	{#each data.shops as shop (shop.name)}
		<div itemprop="offers" itemtype="https://schema.org/Offer" itemscope>
			<a itemprop="url" target="_blank" href={shop.url}>{shop.name}</a>
		</div>
	{/each}
</div>
