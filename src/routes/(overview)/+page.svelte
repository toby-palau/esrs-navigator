<script lang="ts">
	import type { EsrsDocumentType } from '$lib/types/shared';
	import DocumentList from './DocumentList.svelte';
	export let data: { documents: EsrsDocumentType[] };

	const categories = ['General', 'Environment', 'Social', 'Governance'];
</script>

<div class="relative container mx-auto mt-32 pb-12 px-3">
	<div>
		<p class="my-3">
			Welcome to the ESRS Navigator, your go-to guide for easily understanding ESRS standards and
			improving your navigation experience.
		</p>
		<p class="my-3">
			This is just our starting point - think of it as a basic version, with lots of exciting
			updates and new features planned for future releases.
		</p>
		<p class="my-3">
			We really appreciate your feedback, so please don't hesitate to use the feedback button to let
			us know your ideas for enhancements or to point out any bugs. Your insights are key to making
			this tool even better for everyone.
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
