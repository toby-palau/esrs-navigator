export interface EsrsDocumentType {
	title: string;
	description: string;
	imageUrl: string;
	category: string;
	slug: SlugType;
}

export const isEsrsDocumentType = (arg: any): arg is EsrsDocumentType =>
	arg &&
	typeof arg.title === 'string' &&
	typeof arg.description === 'string' &&
	typeof arg.imageUrl === 'string' &&
	typeof arg.category === 'string' &&
	isSlugType(arg.slug);

type SlugType = 'esrs-1' | 'esrs-2' | 'esrs-e1' | 'esrs-e2' | 'esrs-e3' | 'esrs-e4';

export const isSlugType = (arg: any): arg is SlugType =>
	arg &&
	(arg === 'esrs-1' ||
		arg === 'esrs-2' ||
		arg === 'esrs-e1' ||
		arg === 'esrs-e2' ||
		arg === 'esrs-e3' ||
		arg === 'esrs-e4');
