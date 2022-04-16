import	React, {ReactElement}		from	'react';
import	axios						from	'axios';
import	{format}					from	'@yearn/web-lib/utils';
import	{usePrices, useBalances}	from	'@yearn/web-lib/contexts';
import	{Button}					from	'@yearn/web-lib/components';

const	YFI_ADDRESS = '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e';

type TAllData = {timestamp: string}[]
function	HeaderTitle(): ReactElement {
	const	{prices} = usePrices();
	const	{balancesOf} = useBalances();
	const	[allData, set_allData] = React.useState<TAllData>([]);
	const	[tokenPrice, set_tokenPrice] = React.useState('0');

	React.useEffect((): void => {
		set_tokenPrice(format.amount(Number(prices?.['yearn-finance']?.usd || 0), 2));
	}, [prices]);

	React.useEffect((): void => {
		axios.get(process.env.BUYBACK_SOURCE as string).then(({data}): void => {
			set_allData(data);
		});
	}, []);

	return (
		<div className={'justify-between w-full flex-row-center'}>
			<div className={'hidden flex-row items-center md:flex'}>
				<h1 className={'mr-2 md:mr-4 text-typo-primary'}>
					{'YFI Buyback'}
				</h1>
				<p className={'mt-1 text-xs text-typo-secondary'}>
					{`Last update: ${allData && allData.length > 0 ? format.date(new Date(allData?.[allData.length - 1]?.timestamp.replace(/-/g, '/') || ''), false) : 'A few times ago'}`}
				</p>
			</div>
			<div className={'flex flex-col md:hidden'}>
				<h1 className={'mr-2 md:mr-4 text-typo-primary'}>
					{'YFI Buyback'}
				</h1>
				<p className={'mt-1 text-xs text-typo-secondary'}>
					{`Last update: ${allData && allData.length > 0 ? format.date(new Date(allData?.[allData.length - 1]?.timestamp.replace(/-/g, '/') || ''), false) : 'A few times ago'}`}
				</p>
			</div>

			<div className={'hidden flex-row items-center mr-4 space-x-6 md:flex'}>
				<p className={'text-typo-primary-variant'}>
					{`YFI $ ${tokenPrice}`}
				</p>
				<p className={'text-typo-primary-variant'}>
					{`Balance: ${format.amount(Number(balancesOf?.[YFI_ADDRESS] || 0), 6, 6)} YFI`}
				</p>
				<a
					href={'https://cowswap.exchange/#/swap?outputCurrency=0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e&referral=0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52'}
					target={'_blank'}
					rel={'noreferrer'}>
					<Button variant={'filled'} className={'min-w-[136px]'}>
						<p className={'font-normal'}>{'Buy YFI'}</p>
					</Button>
				</a>
			</div>
			
		</div>
	);
}

export default HeaderTitle;
