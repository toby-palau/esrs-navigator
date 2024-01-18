export const renderSearchableText = (text: string, searchQuery: string) => {
	if (searchQuery.length < 2) return text;
	const re = new RegExp(searchQuery, 'ig');
	const matches: any[] = [...text.matchAll(re)];
	for (const [i, match] of matches.splice(0, 2).entries()) {
		text =
			text.slice(0, match.index + 32 * i) +
			`<span class="bg-warning">${match[0]}</span>` +
			text.slice(match.index + match[0].length + 32 * i);
	}
	return text.replace('\\n', '\n');
};
