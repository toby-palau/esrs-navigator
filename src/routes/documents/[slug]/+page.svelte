<script lang="ts">
	import { page } from '$app/stores';
	import DisclosureRequirement from './DisclosureRequirement.svelte';

	export let data: { document: any; chaptersPromise: Promise<any[]> };
	export const { document, chaptersPromise } = data;
</script>

<div>
	<h1 class="text-4xl">{`${document.title} - ${document.description}`}</h1>
	<div class="text-sm breadcrumbs my-4">
		<ul>
			<li><a href="/">ESRS</a></li>
			<li><a href={$page.url.pathname}>{document.title}</a></li>
		</ul>
	</div>

	<!-- Description -->
	<div class="my-4">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Nulla facilisi. Sed euismod, urna id aliquam aliquet, elit nunc ultrices nunc, vitae.</p>
		<p>Curabitur euismod, nunc id aliquam aliquet, elit nunc ultrices nunc, vitae ultricies.</p>
		<p>Etiam euismod, urna id aliquam aliquet, elit nunc ultrices nunc, vitae ultricies nisl.</p>
	</div>

	<!-- Disclosure Requirements -->
	<div class="my-4">
		{#await chaptersPromise}
			<p>Loading...</p>
		{:then chapters}
			{#each chapters as chapter}
				<DisclosureRequirement disclosureRequirement={chapter} />
			{/each}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</div>
