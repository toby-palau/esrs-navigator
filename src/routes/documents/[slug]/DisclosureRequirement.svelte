<script lang="ts">
	import type { ChapterType } from '$lib/types/shared';
	import { renderSearchableText } from '$lib/utils/helperFunctions';
	import Paragraph from './Paragraph.svelte';
	export let chapter: ChapterType;
	export let searchQuery: string;
	export let expanded: boolean;

	let subChapters: any[] = [];
	chapter.paragraphs.forEach((p) => {
		let subChapter = subChapters.find((s) => s.subChapterTitle === p.subChapterTitle);
		if (subChapter) {
			subChapter.paragraphs.push(p);
			subChapters.map((s) => (s.subChapterTitle === p.subChapterTitle ? subChapter : s));
		} else {
			subChapters.push({ subChapterTitle: p.subChapterTitle, paragraphs: [p] });
		}
	});
</script>

<div class="collapse collapse-arrow border border-primary bg-base-200 my-4">
	<input type="checkbox" checked={expanded} />
	<div class="collapse-title text-xl font-medium">
		{@html renderSearchableText(chapter.chapterTitle, searchQuery)}
	</div>
	<div class="collapse-content">
		<div>
			{#if chapter.summary}
				<div class="my-2">
					<p class="whitespace-pre-line">
						<b>{'Summary: \n'}</b>{@html renderSearchableText(
							chapter.summary,
							searchQuery
						).replaceAll('\\n', '\n')}
					</p>
				</div>
			{/if}
			{#if chapter.implementationSteps}
				<div class="my-2 whitespace-pre-line">
					<p class="whitespace-pre-line">
						<b>{'Implementation steps: \n'}</b>
						{@html renderSearchableText(chapter.implementationSteps, searchQuery).replaceAll(
							'\\n',
							'\n'
						)}
					</p>
				</div>
			{/if}
			{#if chapter.example}
				<div class="my-2">
					<p>
						<b>{'Example: \n'}</b>{@html renderSearchableText(
							chapter.example,
							searchQuery
						).replaceAll('\\n', '\n')}
					</p>
				</div>
			{/if}

			<div>
				{#each subChapters as subChapter}
					<h3 class="text-lg mt-5">{subChapter.subChapterTitle}</h3>
					{#each subChapter.paragraphs as paragraph, index}
						<Paragraph
							{paragraph}
							{searchQuery}
							expanded={searchQuery.length >= 2 && index === 0}
						/>
					{/each}
				{/each}
			</div>
		</div>
	</div>
</div>
