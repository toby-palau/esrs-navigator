import * as dotenv from 'dotenv';
import contentful from 'contentful-management';
import chapters from './chapters.json';
import csv from '@fast-csv/parse';
import fs from 'fs';
import path from 'path';
import { RootParagraph } from 'contentful-management/dist/typings/entities/comment';

dotenv.config();

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN } = process.env;

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
	throw new Error(
		[
			'Parameters missing...',
			'Please ensure your .env file exists and contains the variables CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN'
		].join('\n')
	);
}

const client = contentful.createClient({ accessToken: CONTENTFUL_MANAGEMENT_TOKEN });

const space = await client.getSpace(CONTENTFUL_SPACE_ID);
const env = await space.getEnvironment('master');

const paragraphs: any = [];

await new Promise((resolve, reject) => {
	fs.createReadStream('./contentful/ESRS_G1.csv')
		.pipe(csv.parse({ headers: true }))
		.on('error', (error) => console.log(`❌ ${error}`))
		.on('data', async (row: any) => paragraphs.push(row))
		.on('end', resolve);
});

let i = 0;
while (i * 10 < paragraphs.length) {
	const rows = paragraphs.slice(i * 10, (i + 1) * 10);
	rows.forEach(async (row) => {
		const chapterId = chapters.find(
			(chapter) => chapter.esrsDocument === 'ESRS G1' && chapter.chapterTitle === row.chapterTitle
		)?.id;
		const newEntry = await env.createEntry('paragraph', {
			fields: {
				paragraphId: { 'en-US': row.paragraphId },
				subChapterTitle: { 'en-US': row.subChapterTitle },
				dataType: { 'en-US': [row.dataType] },
				esrsDocument: {
					'en-US': {
						sys: {
							type: 'Link',
							linkType: 'Entry',
							id: '3MHGAgne03HoOeq6PEu5O'
						}
					}
				},
				...(chapterId
					? {
							chapter: {
								'en-US': {
									sys: {
										type: 'Link',
										linkType: 'Entry',
										id: chapterId
									}
								}
							}
						}
					: {}),
				originalContent: {
					'en-US': {
						data: {},
						content: row.content.split('\n').map((line: string) => ({
							data: {},
							content: [{ data: {}, marks: [], value: line, nodeType: 'text' }],
							nodeType: 'paragraph'
						})),
						nodeType: 'document'
					}
				}
			}
		});
		console.log(`✅ Created entry for ${newEntry.fields.paragraphId['en-US']}`);
	});
	await new Promise((resolve) =>
		setTimeout(() => {
			resolve(null);
		}, 2000)
	);
	i++;
}

console.log('✅ The content model of your space is set up!');
