import documents from '$lib/data/documents.json';
import type { EsrsDocumentType } from '$lib/types/shared';

export function load(): { documents: EsrsDocumentType[] } {
	return { documents: documents as EsrsDocumentType[] };
}
