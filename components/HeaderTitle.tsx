import	React, {ReactElement}		from	'react';
import	{Button}					from	'@yearn/web-lib/components';

function	HeaderTitle(): ReactElement {
	return (
		<div className={'justify-between w-full flex-row-center'}>
			<div className={'hidden flex-row items-center md:flex'}>
				<h1 className={'mr-2 md:mr-4 text-typo-primary'}>
					{'YFI Buyback'}
				</h1>
			</div>
			<div className={'flex flex-col md:hidden'}>
				<h1 className={'mr-2 md:mr-4 text-typo-primary'}>
					{'YFI Buyback'}
				</h1>
			</div>

			<div className={'hidden flex-row items-center mr-4 space-x-6 md:flex'}>
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
