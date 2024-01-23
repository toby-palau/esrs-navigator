<script lang="ts">
	import type { EsrsDocumentType } from '$lib/types/shared';
	export let documents: EsrsDocumentType[];
</script>

<div
	class="md:flex md:flex-wrap md:flex-row md:my-5 md:-mr-2 sm:grid sm:gap-2 md:grid-cols-3 sm:grid-cols-2"
>
	{#each documents as document}
		<div class="md:w-48 sm:col-span-1">
			<a
				href={`/documents/${document.slug}`}
				class="btn bg-base-200 hover:bg-base-300 border border-primary hover:border-accent h-32 w-full mr-2 my-1 shadow-lg rounded-lg p-4 text-left"
			>
				<div class="h-full w-full">
					<h3 class="text-2xl font-semibold mb-2">{document.title}</h3>
					<p class="font-normal">{document.description}</p>
				</div>
			</a>
		</div>
	{/each}
</div>
