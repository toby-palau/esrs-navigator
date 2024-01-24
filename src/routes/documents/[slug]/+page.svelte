<script lang="ts">
	import type { ChapterType, EsrsDocumentType } from '$lib/types/shared';
	import Chapter from './Chapter.svelte';

	export let data: {
		documents: EsrsDocumentType[];
		slug: string;
		chaptersPromise: Promise<ChapterType[]>;
	};
	export const { documents, slug, chaptersPromise } = data;
	const document = documents.find((d) => d.slug === slug);
	if (!document) throw new Error('Document not found');
	let searchQuery = '';

	const filteredChapters = (chapters: ChapterType[], searchquery: string) => {
		if (searchquery === '') return chapters;
		return chapters
			.map((c) => {
				if (c.chapterTitle.toLowerCase().includes(searchquery.toLowerCase())) return c;
				if (c.summary?.toLowerCase().includes(searchquery.toLowerCase())) return c;
				if (c.implementationSteps?.toLowerCase().includes(searchquery.toLowerCase())) return c;
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

<div class="container px-5">
	<h1 class="text-4xl">{`${document.title} - ${document.description}`}</h1>
	<div class="btn btn-outline btn-sm my-2">
		<p class="font-normal">Download original PDF</p>
		<a href={document.downloadUrl} target="_blank"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
				/>
			</svg></a
		>
	</div>
	<!-- <div class="text-sm breadcrumbs my-10">
		<ul>
			<li><a href="/">ESRS</a></li>
			<li><a href={$page.url.pathname}>{document.title}</a></li>
		</ul>
	</div> -->

	<!-- Description -->
	<div class="my-10">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	</div>

	<!-- Search -->
	<form class="w-full my-10 flex flex-col items-center">
		<div class="relative w-3/4">
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
					<Chapter {chapter} {searchQuery} expand={searchQuery.length >= 2 && index === 0} />
				{/each}
			{/key}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</div>
