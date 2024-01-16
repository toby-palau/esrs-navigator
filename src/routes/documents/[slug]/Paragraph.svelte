<script lang="ts">
	export let paragraph: {
		paragraphId: string;
		content: string;
		summary: string;
		dataType: string;
	};
	let original = false;
	const toggleOriginal = () => {
		original = !original;
	};
</script>

<div class="collapse collapse-plus hover:bg-accent border border-primary bg-base-300 my-2">
	<input type="checkbox" />
	<div class="collapse-title text-md flex flex-row justify-between items-center">
		<div class="flex-3">
			<p class="line-clamp-1 font-medium">
				{`${paragraph.paragraphId}. ${paragraph.summary}`}
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
				<b>{'Summary: '}</b>{paragraph.summary}
			</p>
		</div>
		<div class="p-2">
			<div class={`${original ? 'max-h-none' : 'max-h-0'} transition-max-height overflow-hidden`}>
				<p class="text-xs italic mb-2 whitespace-pre-line">
					<b>{'Original text: '}</b>{@html paragraph.content.replaceAll('\\n', '\n')}
				</p>
			</div>
			<button class="btn btn-xs btn-outline" on:click={toggleOriginal}>
				{`${original ? 'Hide' : 'Show'} original`}
			</button>
		</div>
	</div>
</div>
