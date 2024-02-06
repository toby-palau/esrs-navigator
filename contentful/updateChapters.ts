import * as dotenv from 'dotenv';
import contentful from 'contentful-management';
import csv from '@fast-csv/parse';
import fs from 'fs';
import path from 'path';

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

fs.createReadStream('./contentful/ESRS_G1_summaries.csv')
	.pipe(csv.parse({ headers: true }))
	.on('error', (error) => console.log(`❌ ${error}`))
	.on('data', async (row: any) => {
		const searchResults = (
			await env.getEntries({
				content_type: 'chapter',
				'fields.chapterTitle': row.chapterTitle,
				'fields.esrsDocument.sys.contentType.sys.id': 'esrs-document',
				'fields.esrsDocument.fields.title': 'ESRS G1'
			})
		).items;

		if (searchResults?.length !== 1)
			return console.log(`❌ No entry found for ${row.chapterTitle}`);

		const newEntry = searchResults[0];
		let updatedFlag = false;

		if (newEntry.fields.index !== row.index) {
			newEntry.fields.index = { 'en-US': parseInt(row.index) };
			updatedFlag = true;
		}

		if (row.implementationSteps) {
			newEntry.fields.implementationSteps = {
				'en-US': {
					data: {},
					content: row.implementationSteps.split(' | ').map((step: string) => ({
						data: {},
						content: [
							{
								data: {},
								marks: [],
								value: step,
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
			const updatedEntry = await newEntry.update();
			await updatedEntry.publish();
		}

		console.log(
			`✅ Updated entry for ${newEntry.fields.index} ${newEntry.fields.chapterTitle['en-US']}`
		);
	})
	.on('end', () => console.log('✅ The content model of your space is set up!'));
