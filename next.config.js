const Dotenv = require('dotenv-webpack');

module.exports = ({
	i18n: {
		locales: ['en', 'fr', 'es', 'de', 'pt', 'el', 'tr', 'vi', 'zh', 'hi', 'ja'],
		defaultLocale: 'en',
		localeDetection: false
	},
	plugins: [new Dotenv()],
	images: {
		domains: [
			'rawcdn.githack.com'
		],
	},
	env: {
		WEBSITE_URI: 'https://buyback.major.tax/',
		WEBSITE_NAME: 'YFI Buyback',
		WEBSITE_DESCRIPTION: 'You dump, we buy',
		PROJECT_GITHUB_URL: 'https://github.com/Major-Eth/yBuyback',
		ALCHEMY_KEY: process.env.ALCHEMY_KEY
	}
});
