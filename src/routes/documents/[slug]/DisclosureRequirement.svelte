<script lang="ts">
	import type { ChapterType } from '$lib/types/shared';
	import { renderSearchableText } from '$lib/utils/helperFunctions';
	import Paragraph from './Paragraph.svelte';
	export let chapter: ChapterType;
	export let searchQuery: string;

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
	<input type="checkbox" />
	<div class="collapse-title text-xl font-medium">
		{@html renderSearchableText(chapter.chapterTitle, searchQuery)}
	</div>
	<div class="collapse-content">
		<div>
			<div class="my-2">
				<p>
					<b>{'Summary: '}</b>{@html renderSearchableText(
						"The European Sustainability Reporting Standards (ESRS) help companies report on important sustainability issues. They focus on environmental, social, and governance topics. Companies don't have to report on issues they find unimportant. The aim is to make it clear how companies affect people and the environment. ESRS also guides how to prepare these reports.",
						searchQuery
					)}
				</p>
			</div>
			<div class="my-2">
				<p>
					<b>{'Implementation steps: '}</b>{'...'}
				</p>
			</div>
			<div class="my-2">
				<p>
					<b>{'Example: '}</b>{'...'}
				</p>
			</div>
			<div>
				{#each subChapters as subChapter}
					<h3 class="text-lg font-bold mt-5">{subChapter.subChapterTitle}</h3>
					{#each subChapter.paragraphs as paragraph}
						<Paragraph {paragraph} {searchQuery} />
					{/each}
				{/each}
			</div>
		</div>
	</div>
</div>
