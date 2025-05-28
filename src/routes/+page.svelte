<script lang="ts">
	import type { LayoutProps } from './$types';
	let { data }: LayoutProps = $props();

	import { page } from '$app/state';
	import { goto, preloadData } from '$app/navigation';

	import { FontAwesomeIcon, Scan } from '$lib/components';
	import locale from '$lib/locales';
	import { debounce } from '$lib/utils';
	import { faArrowLeft, faBarcode, faImage, faLightbulb } from '@fortawesome/free-solid-svg-icons';

	let search: HTMLFormElement;
	const searchQuery = page.url.searchParams.get('q');

	let scan = $state(false);
	let scanTorch = $state(false);
</script>

<svelte:head>
	<title></title>
</svelte:head>

{#if scan}
	<div class="sticky top-0 w-full bg-gray-900">
		<button type="button" title={$locale.back} class="p-2.5" onclick={() => (scan = false)}>
			<FontAwesomeIcon icon={faArrowLeft} class="w-5 h-5" />
		</button>
		<button type="button" class="absolute end-0 p-2.5" onclick={() => (scanTorch = !scanTorch)}>
			<FontAwesomeIcon icon={faLightbulb} class="w-5 h-5" />
		</button>
		<hr />
	</div>
	<Scan
		torch={scanTorch}
		onscan={async (value) => {
			const href = `/${value}.html`;
			const data = await preloadData(href);
			if (data.type === 'loaded' && data.status === 200 && data.data.item) await goto(href);
		}}
	/>
{:else}
	<form
		bind:this={search}
		data-sveltekit-replacestate
		data-sveltekit-keepfocus
		data-sveltekit-noscroll
		autocomplete="off"
		class="sticky top-0 w-full bg-gray-900"
	>
		<input
			type="search"
			name="q"
			title={$locale.search}
			placeholder={$locale.search}
			value={searchQuery}
			class="w-full p-2.5 text-sm"
			oninput={debounce(() => search.requestSubmit())}
		/>
		<button
			type="button"
			title={$locale.searchBarcode}
			class="absolute end-0 p-2.5"
			onclick={() => (scan = true)}
		>
			<FontAwesomeIcon icon={faBarcode} class="w-5 h-5" />
		</button>
		<hr />
	</form>
	<div class="grid p-1" style="grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr))">
		{#each data.items as item (item.id)}
			<a href="/{item.id}.html" class="flex flex-col m-1 p-1 rounded-lg bg-gray-900">
				<div class="flex justify-center">
					{#if item.image}
						<img loading="lazy" src="{item.image}?imwidth=304" alt="" class="h-30 w-30" />
					{:else}
						<FontAwesomeIcon icon={faImage} class="h-30 w-30" />
					{/if}
				</div>
				<h3 class="text-sm font-bold">{item.name}</h3>
				<div class="flex flex-col justify-end" style="flex-basis: 100%">
					<span class="flex flex-row justify-end">1,99 €</span>
				</div>
			</a>
		{/each}
	</div>
{/if}
