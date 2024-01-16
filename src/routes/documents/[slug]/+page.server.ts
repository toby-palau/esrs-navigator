import fs from 'fs';
import path from 'path';
import csv from '@fast-csv/parse';
import documents from '$lib/data/documents.json';
import { error } from '@sveltejs/kit';

export async function load({ params: { slug } }) {
	const document = documents.find((d) => d.slug === slug);
	if (!document) {
		return error(404, 'Document not found');
	}

	const chaptersPromise: Promise<any[]> = new Promise((resolve, reject) => {
		let chapters: any[] = [];
		fs.createReadStream(path.resolve(`./src/lib/data/${document.fileName}`))
			.pipe(csv.parse({ headers: true }))
			.on('error', (error) => reject(error))
			.on('data', (row: any) => {
				let chapter = chapters.find((c) => c.chapterTitle === row.chapterTitle);
				if (chapter) {
					chapter.paragraphs.push(row);
					chapters = chapters.map((c) => (c.chapterTitle === chapter.chapterTitle ? chapter : c));
				} else {
					chapter = { chapterTitle: row.chapterTitle, paragraphs: [row] };
					chapters.push(chapter);
				}
			})
			.on('end', () => resolve(chapters));
	});

	return {
		document,
		chaptersPromise: await chaptersPromise
	};
}
