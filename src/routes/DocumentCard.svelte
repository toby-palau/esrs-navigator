<script lang="ts">
	import type { EsrsDocumentType } from '$lib/types/shared';

	export let document: EsrsDocumentType;
</script>

<li>
	<a
		href={`/documents/${document.slug}`}
		class="btn bg-base-200 hover:bg-base-300 border border-primary hover:border-accent w-48 h-32 mr-2 my-1 shadow-lg rounded-lg p-4 text-left"
	>
		<div class="h-full w-full">
			<h3 class="text-2xl font-semibold mb-2">{document.title}</h3>
			<p class="font-normal">{document.description}</p>
		</div>
	</a>
</li>

<style>
</style>
