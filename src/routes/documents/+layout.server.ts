// import documents from '$lib/data/documents.json';
// import type { EsrsDocumentType } from '$lib/types/shared';

// export async function load({ params: { slug } }) {
// 	return {
// 		documents: documents as EsrsDocumentType[],
// 		slug
// 	};
// }

import fs from 'fs';
import path from 'path';
import csv from '@fast-csv/parse';
import documents from '$lib/data/documents.json';
import { error } from '@sveltejs/kit';
import type { ChapterType } from '$lib/types/shared.js';

export async function load({ params: { slug } }) {
	const document = documents.find((d) => d.slug === slug);
	if (!document) return error(404, 'Document not found');

	let chapters: ChapterType[] = [];

	if (document.summariesFileName && fs.existsSync(`./src/lib/data/${document.summariesFileName}`)) {
		await new Promise((resolve, reject) => {
			fs.createReadStream(path.resolve(`./src/lib/data/${document.summariesFileName}`))
				.pipe(csv.parse({ headers: true }))
				.on('error', (error) => reject(error))
				.on('data', (row: any) => {
					chapters.push({
						chapterTitle: row.chapterTitle,
						paragraphs: [],
						summary: row.summary,
						implementationSteps: row.implementationSteps,
						example: row.example
					});
				})
				.on('end', () => resolve(chapters));
		});
	}

	const chaptersPromise: Promise<ChapterType[]> = new Promise((resolve, reject) => {
		fs.createReadStream(path.resolve(`./src/lib/data/${document.fileName}`))
			.pipe(csv.parse({ headers: true }))
			.on('error', (error) => reject(error))
			.on('data', (row: any) => {
				let chapter = chapters.find((c) => c.chapterTitle === row.chapterTitle);
				if (chapter) {
					chapter.paragraphs.push(row);
					chapters = chapters.map((c) => (c.chapterTitle === chapter?.chapterTitle ? chapter : c));
				} else {
					chapter = {
						chapterTitle: row.chapterTitle,
						paragraphs: [row],
						summary: '',
						implementationSteps: '',
						example: ''
					};
					chapters.push(chapter);
				}
			})
			.on('end', () => resolve(chapters));
	});

	return {
		slug,
		documents,
		chaptersPromise: await chaptersPromise
	};
}
