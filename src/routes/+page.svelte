<script lang="ts">
	import type { EsrsDocumentType } from '$lib/types/shared';
	import DocumentList from './DocumentList.svelte';
	export let data: { documents: EsrsDocumentType[] };

	const categories = ['General', 'Environment', 'Social', 'Governance'];
</script>

<h1 class="text-4xl">ESRS Navigator</h1>
<ul class="my-12">
	{#each categories as category}
		<li>
			<h2 class="text-3xl">{category}</h2>
			<DocumentList documents={data.documents.filter((d) => d.category === category)} />
		</li>
	{/each}
</ul>
