module.exports = ({
	images: {
		domains: [
			'rawcdn.githack.com'
		]
	},
	env: {
		/* 🔵 - Yearn Finance **************************************************
		** Config over the RPC
		**********************************************************************/
		WEB_SOCKET_URL: {
			1: process.env.WS_URL_MAINNET,
			250: process.env.WS_URL_FANTOM,
			42161: process.env.WS_URL_ARBITRUM
		},
		JSON_RPC_URL: {
			1: process.env.RPC_URL_MAINNET,
			250: process.env.RPC_URL_FANTOM,
			42161: process.env.RPC_URL_ARBITRUM
		},
		ALCHEMY_KEY: process.env.ALCHEMY_KEY,
		INFURA_KEY: process.env.INFURA_KEY,

		/* 🔵 - Yearn Finance **************************************************
		** Buyback specific env variables
		**********************************************************************/
		BUYBACK_SOURCE: 'https://raw.githubusercontent.com/yearn/ychad-audit/master/reports/financial/buybacks/buybacks.json',
		BUYBACK_ADDR: '0x6903223578806940bd3ff0c51f87aa43968424c8',
		LLAMA_STREAM_ADDR: '0x60c7B0c5B3a4Dc8C690b074727a17fF7aA287Ff2',
		YFI_ADDR: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
		DAI_ADDR: '0x6b175474e89094c44da98b954eedeac495271d0f'
	}
});
