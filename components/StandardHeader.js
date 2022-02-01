import	React					from	'react';
import	axios					from	'axios';
import	useWeb3					from	'contexts/useWeb3';
import	usePrices				from	'contexts/usePrices';
import	useBalances				from	'contexts/useBalances';
import	useInterval				from	'hooks/useInterval';
import	useHover				from	'hooks/useHover';
import	IconHamburger			from	'components/icons/IconHamburger';
import	ModalMenu				from	'components/ModalMenu';
import	{truncateHex, formatAmount, formatDate}			from	'utils';

function FlyingReaction({x, y, timestamp}) {
	return (
		<div className={`absolute select-none pointer-events-none text-${(timestamp % 5) + 2}xl goUp${(timestamp % 3)}`} style={{left: x, top: y}}>
			<div className={`leftRight${(timestamp % 3)}`}>
				<div className={'-translate-x-1/2 -translate-y-1/2'}>
					{'🔥'}
				</div>
			</div>
		</div>
	);
}

const		YFI_ADDRESS = '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e';
function	Header() {
	const	{prices} = usePrices();
	const	{balancesOf} = useBalances();
	const	{active, address, ens, openLoginModal, deactivate, onDesactivate} = useWeb3();
	const	[openMenu, set_openMenu] = React.useState(false);
	const	[allData, set_allData] = React.useState(null);
	const	[reactions, set_reactions] = React.useState([]);
	const	[hoverRef, hoverState] = useHover();
	const	[yfiAmount, set_yfiAmount] = React.useState('-');
	const	[yfiPrice, set_yfiPrice] = React.useState('-');

	// Remove reactions that are not visible anymore (every 1 sec)
	useInterval(() => {
		set_reactions((reactions) =>
			reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000)
		);
	}, 1000);
	
	useInterval(() => {
		if (hoverState) {
			set_reactions((reactions) =>
				reactions.concat([
					{
						point: {x: hoverState.clientX, y: hoverState.clientY},
						timestamp: Date.now(),
					},
				])
			);
		}
	}, 200);


	React.useEffect(() => {
		axios.get(process.env.BUYBACK_SOURCE).then(({data}) => {
			set_allData(data);
		});
	}, []);

	React.useEffect(() => {
		set_yfiAmount((Number(balancesOf?.[YFI_ADDRESS]) || 0) === 0 ? '-' : formatAmount(balancesOf?.[YFI_ADDRESS] || 0, 6));
		set_yfiPrice(formatAmount(prices?.['yearn-finance']?.usd || 0, 2));
	}, [balancesOf, prices]);

	return (
		<header className={'fixed top-0 left-0 z-50 py-0 w-screen bg-white-blue-1 md:py-4'}>
			<div className={'flex justify-between items-center py-3 px-2 mx-auto w-full max-w-6xl h-auto bg-white rounded-sm md:p-6 md:h-20'}>
				<div className={'flex flex-row items-center'}>
					<h2 className={'mr-2 text-lg font-bold text-dark-blue-1 md:mr-4'}>
						{'YFI Buyback'}
					</h2>
					<p className={'mt-1 text-xs text-gray-blue-1'}>
						{`Last update: ${allData && allData.length > 0 ? formatDate(new Date(allData?.[allData.length - 1]?.timestamp.replace(/-/g, '/') || ''), false) : 'A few times ago'}`}
					</p>
				</div>
				<div className={'flex flex-row items-center space-x-6 md:hidden'}>
					<div
						onClick={() => set_openMenu(true)}
						className={'p-1 -m-1'}>
						<IconHamburger />
					</div>
				</div>
				<div className={'hidden flex-row items-center space-x-6 md:flex'}>
					<p className={'text-yearn-blue'}>
						{`YFI $ ${yfiPrice}`}
					</p>
					<p className={'text-yearn-blue'}>
						{`Balance: ${yfiAmount} YFI`}
					</p>
					<a href={'https://cowswap.exchange/#/swap?outputCurrency=0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e&referral=0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52'} target={'_blank'} rel={'noreferrer'}>
						<button ref={hoverRef} className={'button-small button-filled'}>
							<p className={'font-normal'}>{'Buy YFI'}</p>
						</button>
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
			<ModalMenu open={openMenu} set_open={set_openMenu} />
			{reactions.map((reaction) => {
				return (
					<FlyingReaction
						key={reaction.timestamp.toString()}
						x={reaction.point.x}
						y={reaction.point.y}
						timestamp={reaction.timestamp}
					/>
				);
			})}
		</header>
	);
}

export default Header;
