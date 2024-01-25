<script lang="ts">
	import type { ChapterType } from '$lib/types/shared';
	import { renderSearchableText } from '$lib/utils/helperFunctions';
	export let chapter: ChapterType;
	export let searchQuery: string;
	export let expand: boolean;
	let expandDetails = expand;

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
	<input type="checkbox" checked={expand} />
	<div class="collapse-title text-xl font-medium">
		{@html renderSearchableText(chapter.chapterTitle, searchQuery)}
	</div>
	<div class="collapse-content">
		<div>
			{#if chapter.summary}
				<div class="my-2">
					<p class="whitespace-pre-line">
						<b>{'Summary: \n'}</b>{@html renderSearchableText(chapter.summary, searchQuery)}
					</p>
				</div>
			{/if}
			{#if chapter.implementationSteps}
				<div class="my-2">
					<p class="font-bold">{'Implementation steps:'}</p>
					<ul class="steps steps-vertical">
						{#each chapter.implementationSteps.split('|').entries() as [i, step]}
							<li class="step text-left">
								<p
									class="text-left whitespace-pre-line rounded-box bg-base-100 py-2 px-3 border border-base-300 drop-shadow-sm"
								>
									{@html renderSearchableText(step, searchQuery)}
								</p>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
		<div
			class="collapse collapse-arrow border border-primary bg-base-200 mt-10 text-primary text-xs"
		>
			<input type="checkbox" bind:checked={expandDetails} />
			<div class="collapse-title text-center italic">
				{expandDetails ? 'Hide original content' : 'Show original content'}
			</div>
			<div class="collapse-content">
				{#each subChapters as subChapter}
					<h3 class="font-bold mt-5">{subChapter.subChapterTitle}</h3>
					{#each subChapter.paragraphs as paragraph}
						<li class="my-5 whitespace-pre-line list-none">
							{@html `${paragraph.paragraphId}. ${renderSearchableText(
								paragraph.content,
								searchQuery
							)}`}
						</li>
					{/each}
				{/each}
			</div>
		</div>

		<!-- {#each subChapters as subChapter}
					<h3 class="text-lg mt-5">{subChapter.subChapterTitle}</h3>
					{#each subChapter.paragraphs as paragraph, index}
						<Paragraph
							{paragraph}
							{searchQuery}
							expanded={searchQuery.length >= 2 && index === 0}
						/>
					{/each}
				{/each} -->
	</div>
</div>
