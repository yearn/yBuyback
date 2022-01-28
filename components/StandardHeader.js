import	React					from	'react';
import	usePrices				from	'contexts/usePrices';
import	useWeb3					from	'contexts/useWeb3';
import	BUYBACKS				from	'public/buybacks.json';
import	{truncateHex, formatAmount, formatDate}			from	'utils';

function	Header({children}) {
	const	{prices} = usePrices();
	const	{active, address, ens, openLoginModal, deactivate, onDesactivate} = useWeb3();

	return (
		<header className={'z-50 py-4 mx-auto w-full max-w-6xl bg-white-blue-1'}>
			<div className={'flex justify-between items-center p-6 h-20 bg-white rounded-sm'}>
				<div className={'flex flex-row items-center'}>
					<h2 className={'mr-4 text-lg font-bold text-dark-blue-1'}>
						{'YFI Buyback'}
					</h2>
					<p className={'text-xs text-gray-blue-1'}>
						{`Last update: ${formatDate(new Date(BUYBACKS[BUYBACKS.length - 1].timestamp))}`}
					</p>
				</div>
				<div className={'flex flex-row items-center space-x-6'}>
					<p className={'text-yearn-blue'}>{`YFI $ ${formatAmount(prices?.['yearn-finance']?.usd || 0, 2)}`}</p>
					<p className={'text-yearn-blue'}>{'Balance: 0 YFI'}</p>
					<a href={'https://cowswap.exchange/#/swap?outputCurrency=0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'} target={'_blank'} rel={'noreferrer'}>
						<button className={'button-small button-light'}>{'Buy YFI'}</button>
					</a>
					<button
						onClick={() => {
							if (active) {
								deactivate();
								onDesactivate();
							} else {
								openLoginModal();
							}
						}}
						className={'truncate button-small button-light'}>
						{!active ? 'Connect wallet' : ens ? ens : truncateHex(address, 4)}
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
