import * as dotenv from 'dotenv';
import contentful from 'contentful-management';
import chapters from './chapters.json';
import csv from '@fast-csv/parse';
import fs from 'fs';

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

const searchResults = await env.getEntries({
	content_type: 'paragraph',
	'fields.esrsDocument.sys.contentType.sys.id': 'esrs-document',
	'fields.esrsDocument.fields.title': 'ESRS G1',
	limit: 500
});

if (searchResults.items.length < 1) throw new Error('❌ No paragraphs found');

const existingEntries = searchResults.items;

let i = 0;
while (i * 4 < paragraphs.length) {
	const rows = paragraphs.slice(i * 4, (i + 1) * 4);
	rows.forEach(async (row) => {
		const paragraph = existingEntries.find(
			(p) => p.fields.paragraphId['en-US'] === row.paragraphId
		);
		if (!paragraph) throw new Error(`❌ No paragraph found for ${row.paragraphId}`);

		let updatedFlag = false;
		if (paragraph.fields.index !== row.index) {
			paragraph.fields.index = { 'en-US': parseInt(row.index) };
			updatedFlag = true;
		}

		if (row.content.includes('\\n')) {
			paragraph.fields.originalContent = {
				'en-US': {
					data: {},
					content: row.content.split('\\n').map((p: string) => ({
						data: {},
						content: [
							{
								data: {},
								marks: [],
								value: p.trim(),
								nodeType: 'text'
							}
						],
						nodeType: 'paragraph'
					})),
					nodeType: 'document'
				}
			};
			updatedFlag = true;
		}

		if (updatedFlag) {
			const updatedEntry = await paragraph.update();
			await updatedEntry.publish();
		}

		console.log(`✅ Updated entry for ${paragraph.fields.paragraphId['en-US']}`);
	});
	await new Promise((resolve) =>
		setTimeout(() => {
			resolve(null);
		}, 2000)
	);
	i++;
}

console.log('✅ The content model of your space is set up!');
