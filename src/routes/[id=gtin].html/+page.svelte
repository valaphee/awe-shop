<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data }: LayoutProps = $props();

	import { FontAwesomeIcon, locale, preventDefault } from '$lib';
	import { faArrowLeft, faImage } from '@fortawesome/free-solid-svg-icons';
</script>

<svelte:head>
	<title>{data.item.name}</title>
</svelte:head>

<div class="sticky top-0 w-full dark:bg-gray-900" style="font-size: 0">
	<a
		href={data.back}
		title={$locale.back}
		class="inline-block p-2.5"
		onclick={preventDefault(() => window.history.back())}
	>
		<FontAwesomeIcon icon={faArrowLeft} class="w-5 h-5" />
	</a>
	<hr />
</div>

<div itemprop="mainEntity" itemtype="https://schema.org/Product" itemscope>
	<div class="dark:bg-gray-900">
		{#if data.item.image}
			<img itemprop="image" src={data.item.image} alt="" class="h-80 w-80 m-auto" />
		{:else}
			<FontAwesomeIcon icon={faImage} class="h-80 w-80 m-auto" />
		{/if}
		<h1 itemprop="name" class="text-center text-xl font-bold">{data.item.name}</h1>
	</div>

	<div>
		<h2 class="m-5 text-xl font-bold">{$locale.offers}</h2>
		<div class="m-5 dark:bg-gray-900">
			{#each data.shops as shop (shop.name)}
				<div itemprop="offers" itemtype="https://schema.org/Offer" itemscope>
					<a itemprop="url" target="_blank" href={shop.url}>{shop.name}</a>
				</div>
			{/each}
		</div>
	</div>
</div>
