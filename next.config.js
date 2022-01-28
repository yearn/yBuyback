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
		WEBSITE_DESCRIPTION: 'You dump, we buy. Simple.',
		PROJECT_GITHUB_URL: 'https://github.com/Major-Eth/yBuyback',
		USE_PRICES: true,
		USE_PRICE_TRI_CRYPTO: false,
		CG_IDS: ['yearn-finance'],
		TOKENS: [
			['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18]
		],
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		BUYBACK_SOURCE: 'https://raw.githubusercontent.com/yearn/ychad-audit/master/reports/financial/buybacks/buybacks.json'
	}
});
