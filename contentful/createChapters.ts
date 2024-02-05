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
		const newEntry = await env.createEntry('chapter', {
			fields: {
				chapterTitle: {
					'en-US': row.chapterTitle
				},
				...(row.summary
					? {
							summary: {
								'en-US': {
									data: {},
									content: [
										{
											data: {},
											content: [
												{
													data: {},
													marks: [],
													value: row.summary,
													nodeType: 'text'
												}
											],
											nodeType: 'paragraph'
										}
									],
									nodeType: 'document'
								}
							}
						}
					: {}),
				esrsDocument: {
					'en-US': {
						sys: {
							type: 'Link',
							linkType: 'Entry',
							id: '3MHGAgne03HoOeq6PEu5O'
						}
					}
				}
			}
		});
		console.log(`✅ Created entry for ${newEntry.fields.chapterTitle['en-US']}`);
	})
	.on('end', () => console.log('✅ The content model of your space is set up!'));
