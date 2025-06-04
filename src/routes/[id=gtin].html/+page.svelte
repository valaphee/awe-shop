<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data }: LayoutProps = $props();

	import { page } from '$app/state';

	import { FontAwesomeIcon } from '$lib/components';
	import locale from '$lib/locales';
	import { preventDefault } from '$lib/utils';
	import { faArrowLeft, faImage } from '@fortawesome/free-solid-svg-icons';
</script>

<svelte:head>
	<title>{data.item.name}</title>
</svelte:head>

<div class="sticky top-0 w-full bg-pane" style="font-size: 0">
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

<div itemprop="mainEntity" itemscope itemtype="https://schema.org/Product">
	<div class="p-2 bg-pane">
		<meta itemprop="gtin" content={page.params.id} />
		{#if data.item.image}
			<img itemprop="image" src={data.item.image} alt="" class="h-60 w-60 m-auto" />
		{:else}
			<FontAwesomeIcon icon={faImage} class="h-60 w-60 m-auto" />
		{/if}
		<h1 itemprop="name" class="text-xl font-bold">{data.item.name}</h1>
		<div class="flex flex-col justify-end" style="flex-basis: 100%">
			<span class="flex flex-row justify-end text-xl">Unknown</span>
		</div>
	</div>
</div>
