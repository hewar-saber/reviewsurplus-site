module.exports = {
	tabWidth: 4,
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	bracketSpacing: true,
	jsxBracketSameLine: false,
	arrowParens: 'avoid',
	trailingComma: 'none',
	endOfLine: 'auto',
	overrides: [
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
			options: {
				semi: false
			}
		}
	]
}
