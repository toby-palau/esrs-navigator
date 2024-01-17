<script lang="ts">
	import Paragraph from './Paragraph.svelte';

	export let disclosureRequirement: { chapterTitle: string; paragraphs: any[] };
	console.log(disclosureRequirement.paragraphs.length);

	let subChapters: any[] = [];
	disclosureRequirement.paragraphs.forEach((p) => {
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
		{disclosureRequirement.chapterTitle}
	</div>
	<div class="collapse-content">
		<div>
			<div class="my-2">
				<p>
					<b>{'Implementation steps: '}</b
					>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'}
				</p>
			</div>
			<div class="my-2">
				<p>
					<b>{'Example: '}</b
					>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'}
				</p>
			</div>
			<div>
				{#each subChapters as subChapter}
					<h3 class="text-lg font-bold mt-5">{subChapter.subChapterTitle}</h3>
					{#each subChapter.paragraphs as paragraph}
						<Paragraph {paragraph} />
					{/each}
				{/each}
			</div>
		</div>
	</div>
</div>
