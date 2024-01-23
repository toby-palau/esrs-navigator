<script lang="ts">
	import type { EsrsDocumentType } from '$lib/types/shared';
	export let data: { documents: EsrsDocumentType[]; slug: string };
	let { documents, slug } = data;
	const categories = ['General', 'Environment', 'Social', 'Governance'];

	const downloadUrl = documents.find((d) => d.slug === slug)?.downloadUrl;
</script>

<div class="drawer lg:drawer-open">
	<label
		for="my-drawer-2"
		class="fixed z-10 top-0 left-0 btn rounded-br-2xl swap swap-rotate lg:hidden"
	>
		<input type="checkbox" />
		<svg
			class="swap-off fill-current"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 512 512"
			><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg
		>
		<svg
			class="swap-on fill-current"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 512 512"
			><polygon
				points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
			/></svg
		>
	</label>
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="relative drawer-content container mx-auto my-12 px-3">
		<slot />
	</div>
	<div class="drawer-side z-20">
		<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
		<div class="w-56 min-h-full bg-base-200">
			<ul class="menu menu-horizontal w-full">
				<li>
					<a href="/">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/></svg
						>
					</a>
				</li>
				<li>
					<a href={downloadUrl} target="_blank"
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
				</li>
			</ul>
			<ul class="menu w-56 text-sm">
				{#each categories as category}
					<li>
						<details open>
							<summary>{category}</summary>
							<ul>
								{#each documents.filter((d) => d.category === category) as document}
									<li>
										<a
											href="/documents/{document.slug}"
											target="_self"
											class={document.slug === slug ? 'active' : ''}>{document.title}</a
										>
									</li>
								{/each}
							</ul>
						</details>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
