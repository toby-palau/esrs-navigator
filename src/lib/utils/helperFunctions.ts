export const renderSearchableText = (text: string, searchQuery: string) => {
	if (!searchQuery) return text;
	const re = new RegExp(searchQuery, 'ig');
	const matches: any[] = [...text.matchAll(re)];
	for (const match of matches) {
		text =
			text.slice(0, match.index) +
			`<span class="bg-warning">${match[0]}</span>` +
			text.slice(match.index + match[0].length);
	}
	return text;
};
