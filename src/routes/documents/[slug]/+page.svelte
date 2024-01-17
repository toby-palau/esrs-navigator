<script lang="ts">
	import { page } from '$app/stores';
	import type { ChapterType } from '$lib/types/shared';
	import DisclosureRequirement from './DisclosureRequirement.svelte';

	export let data: { document: any; chaptersPromise: Promise<ChapterType[]> };
	export const { document, chaptersPromise } = data;
	let searchQuery = '';

	const filteredChapters = (chapters: ChapterType[], searchquery: string) => {
		if (searchquery === '') return chapters;
		return chapters
			.map((c) => {
				if (c.chapterTitle.toLowerCase().includes(searchquery.toLowerCase())) return c;
				return {
					...c,
					paragraphs: c.paragraphs.filter((p) =>
						p.content.toLowerCase().includes(searchquery.toLowerCase())
					)
				};
			})
			.filter((c) => c.paragraphs.length > 0);
	};
</script>

<div>
	<h1 class="text-4xl">{`${document.title} - ${document.description}`}</h1>
	<div class="text-sm breadcrumbs my-10">
		<ul>
			<li><a href="/">ESRS</a></li>
			<li><a href={$page.url.pathname}>{document.title}</a></li>
		</ul>
	</div>

	<!-- Description -->
	<div class="my-10">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	</div>

	<!-- Search -->

	<form class="w-full my-10 flex flex-col items-center">
		<div class="relative w-1/2">
			<div class="absolute pointer-events-none h-full flex items-center justify-center p-5">
				<svg
					class="w-4 h-4 text-primary"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			</div>
			<input
				type="search"
				id="default-search"
				class="w-full input input-bordered input-primary pl-12 placeholder:text-primary"
				placeholder="Search..."
				required
				bind:value={searchQuery}
			/>
		</div>
	</form>

	<!-- Disclosure Requirements -->
	<div class="my-4">
		{#await chaptersPromise}
			<p>Loading...</p>
		{:then chapters}
			{#key searchQuery}
				{#each filteredChapters(chapters, searchQuery) as chapter, index}
					<DisclosureRequirement
						{chapter}
						{searchQuery}
						expanded={searchQuery.length >= 2 && index === 0}
					/>
				{/each}
			{/key}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</div>
