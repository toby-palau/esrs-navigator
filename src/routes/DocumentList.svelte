<script lang="ts">
	import type { EsrsDocumentType } from '$lib/types/shared';
	import DocumentCard from './DocumentCard.svelte';

	export let documents: EsrsDocumentType[];
</script>

<ul class="flex flex-row flex-wrap my-5 -mr-2">
	{#each documents as document}
		<DocumentCard {document} />
	{/each}
</ul>
