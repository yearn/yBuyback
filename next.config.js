const DOTENV = require('dotenv-webpack');

module.exports = ({
	experimental: {
		concurrentFeatures: true
	},
	plugins: [new DOTENV()],
	images: {
		domains: [
			'rawcdn.githack.com'
		]
	},
	env: {
		WEBSITE_URI: 'https://buyback.major.tax/',
		WEBSITE_NAME: 'YFI Buyback',
		WEBSITE_TITLE: 'YFI Buyback',
		WEBSITE_DESCRIPTION: 'You dump, we buy. Simple.',
		PROJECT_GITHUB_URL: 'https://github.com/Major-Eth/yBuyback',
		USE_WALLET: true,
		USE_PRICES: true,
		USE_NETWORKS: false,
		USE_FEEDBACKS: false,
		USE_PRICE_TRI_CRYPTO: false,
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,

		FEEBACKS_TYPE: 'github',
		LINEAR_OAUTH_TOKEN: process.env.LINEAR_OAUTH_TOKEN,
		LINEAR_TEAM_ID: process.env.LINEAR_TEAM_ID,
		LINEAR_PROJECT_NAME: process.env.LINEAR_PROJECT_NAME,

		GITHUB_AUTH_TOKEN: process.env.GITHUB_AUTH_TOKEN,
		GITHUB_PROJECT_OWNER: process.env.GITHUB_PROJECT_OWNER,
		GITHUB_PROJECT_REPO: process.env.GITHUB_PROJECT_REPO,



		CG_IDS: ['yearn-finance'],
		TOKENS: [['0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', 18, 1]],
		KNOWN_ENS: {},
		GRAPH_URL_PROD: {
			1: `https://gateway.thegraph.com/api/${process.env.GRAPH_API_KEY}/subgraphs/id/5xMSe3wTNLgFQqsAc5SCVVwT4MiRb5AogJCuSN9PjzXF`,
			250: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-fantom',
			42161: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-arbitrum'
		},
		GRAPH_URL: {
			1: 'https://api.thegraph.com/subgraphs/name/salazarguille/yearn-vaults-v2-subgraph-mainnet',
			// 250: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-fantom',
			250: 'https://api.thegraph.com/subgraphs/name/bsamuels453/yearn-fantom-validation-grafted',
			42161: 'https://api.thegraph.com/subgraphs/name/yearn/yearn-vaults-v2-arbitrum'
		},
		RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			250: process.env.RPC_URL_FANTOM || 'https://rpc.ftm.tools',
			42161: process.env.RPC_URL_ARBITRUM || 'https://arbitrum.public-rpc.com'
		},
		BUYBACK_SOURCE: 'https://raw.githubusercontent.com/yearn/ychad-audit/master/reports/financial/buybacks/buybacks.json'
	}
});
