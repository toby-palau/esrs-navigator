<script lang="ts">
	import type { EsrsDocumentType } from '$lib/types/shared';
	import DocumentList from './DocumentList.svelte';
	export let data: { documents: EsrsDocumentType[] };

	const categories = ['General', 'Environment', 'Social', 'Governance'];
</script>

<ul class="my-12">
	{#each categories as category}
		<li class="my-4">
			<h2 class="my-2 text-3xl font-medium">{category}</h2>
			<DocumentList documents={data.documents.filter((d) => d.category === category)} />
		</li>
	{/each}
</ul>
