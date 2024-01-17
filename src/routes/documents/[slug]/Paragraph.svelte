<script lang="ts">
	import type { ParagraphType } from '$lib/types/shared';
	import { renderSearchableText } from '$lib/utils/helperFunctions';

	export let paragraph: ParagraphType;
	export let searchQuery: string;
	// let original = false;
	// const toggleOriginal = () => {
	// 	original = !original;
	// };
</script>

<div class="collapse collapse-plus hover:bg-accent border border-primary bg-base-300 my-2">
	<input type="checkbox" />
	<div class="collapse-title text-md flex flex-row justify-between items-center">
		<div class="flex-3">
			<p class="line-clamp-1 font-medium max-w-4xl">
				{@html `${paragraph.paragraphId}. ${renderSearchableText(
					paragraph.content,
					searchQuery
				).replaceAll('\\n', '\n')}`}
			</p>
		</div>
		{#if paragraph.dataType}
			<div class="min-w-40 flex justify-end">
				<div class="badge badge-secondary">{paragraph.dataType}</div>
			</div>
		{/if}
	</div>
	<div class="collapse-content">
		<div class="my-2">
			<p>
				{@html renderSearchableText(paragraph.content, searchQuery).replaceAll('\\n', '\n')}
			</p>
		</div>
		<!-- <div class="p-2">
			<div class={`${original ? 'max-h-none' : 'max-h-0'} transition-max-height overflow-hidden`}>
				<p class="text-xs italic mb-2 whitespace-pre-line">
					<b>{'Original text: '}</b>
				</p>
			</div>
			<button class="btn btn-xs btn-outline" on:click={toggleOriginal}>
				{`${original ? 'Hide' : 'Show'} original`}
			</button>
		</div> -->
	</div>
</div>
