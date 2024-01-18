<script lang="ts">
	import type { ChapterType } from '$lib/types/shared';
	import { renderSearchableText } from '$lib/utils/helperFunctions';
	export let chapter: ChapterType;
	export let searchQuery: string;
	export let expand: boolean;

	let expandRequirements = false;

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
		<div class="m">
			{#if chapter.summary}
				<div class="my-2">
					<p class="whitespace-pre-line">
						<b>{'Summary: \n'}</b>{@html renderSearchableText(chapter.summary, searchQuery)}
					</p>
				</div>
			{/if}
			{#if chapter.implementationSteps}
				<div class="my-2 whitespace-pre-line p-5">
					<b>{'Implementation steps: \n'}</b>
					<ul class="timeline timeline-vertical -left-3/4 w-[150%]">
						{#each chapter.implementationSteps.split('|').entries() as [i, step]}
							<li>
								{#if i > 0}<hr />{/if}
								<div class="timeline-start">{i + 1}</div>
								<div class="timeline-middle">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										class="w-5 h-5"
										><path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
											clip-rule="evenodd"
										/></svg
									>
								</div>
								<div class="timeline-end timeline-box whitespace-pre-line">
									{@html renderSearchableText(step, searchQuery)}
								</div>
								{#if i < chapter.implementationSteps.split('|').length - 1}<hr />{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if chapter.example}
				<div class="my-2">
					<p>
						<b>{'Example: \n'}</b>{@html renderSearchableText(chapter.example, searchQuery)}
					</p>
				</div>
			{/if}
		</div>
		<div class="text-xs flex flex-col items-center m-5">
			<div
				class={`${
					expandRequirements ? 'max-h-auto' : 'max-h-0'
				} w-full overflow-hidden transition tranistion-max-height duration-500 ease-in-out`}
			>
				{#each subChapters as subChapter}
					<h3 class="font-bold mt-5">{subChapter.subChapterTitle}</h3>
					{#each subChapter.paragraphs as paragraph}
						<li class="my-5 whitespace-pre-line list-none">
							{`${paragraph.paragraphId}. ${renderSearchableText(paragraph.content, searchQuery)}`}
						</li>
					{/each}
				{/each}
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
			<button
				class="btn btn-xs btn-outline"
				on:click={() => (expandRequirements = !expandRequirements)}
			>
				{expandRequirements ? 'Hide requirements' : 'Show requirements'}
			</button>
		</div>
	</div>
</div>
