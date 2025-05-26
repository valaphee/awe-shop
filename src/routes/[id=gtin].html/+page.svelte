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
	<div class="p-2 dark:bg-gray-900">
		{#if data.item.image}
			<img itemprop="image" src={data.item.image} alt="" class="h-60 w-60 m-auto" />
		{:else}
			<FontAwesomeIcon icon={faImage} class="h-60 w-60 m-auto" />
		{/if}
		<h1 itemprop="name" class="text-xl font-bold">{data.item.name}</h1>
	</div>
</div>
