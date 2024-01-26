<script lang="ts">
	import type { EsrsDocumentType } from '$lib/types/shared';
	import DocumentList from './DocumentList.svelte';
	export let data: { documents: EsrsDocumentType[] };

	const categories = ['General', 'Environment', 'Social', 'Governance'];
</script>

<div class="relative container mx-auto pt-16 px-3">
	<div class="my-8">
		<h2 class="my-1 text-2xl font-bold">
			Welcome to the ESRS Navigator! 
		</h2>
		<p class="my-1 italic text-sm">
			🧭 Your go-to guide for easily understanding ESRS standards and
			improving your navigation experience.
		</p>
		<p class="mt-8">
			🚀 This is our starting point - a basic version with exciting updates and new features planned for the future.
		</p>
		<p class="my-2">
			💡 Your feedback is valuable to us. Please use the feedback button to share your enhancement ideas or report bugs. Your insights help us improve this tool for everyone.
		</p>
	</div>
	<ul>
		{#each categories as category}
			<li class="my-6">
				<h2 class="my-2 text-3xl font-medium">{category}</h2>
				<DocumentList documents={data.documents.filter((d) => d.category === category)} />
			</li>
		{/each}
	</ul>
</div>
