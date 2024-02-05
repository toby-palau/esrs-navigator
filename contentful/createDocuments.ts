import * as dotenv from 'dotenv';
import contentful from 'contentful-management';
import documents from './documents.json';

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
for (const document of documents) {
	const newEntry = await env.createEntry('esrs-document', document);
}

console.log('✅ The content model of your space is set up!');
