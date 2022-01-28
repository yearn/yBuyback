import	React					from	'react';
import	FlipMove				from	'react-flip-move';
import	IconCopy				from	'components/icons/IconCopy';
import	IconArrowDown			from	'components/icons/IconArrowDown';
import	{truncateHex, formatAmount, formatDate, sortByKey, sum}			from	'utils';

const	someData = [
	{
		'id': 1,
		'timestamp': '2020-11-17 17:30:00',
		'yfiAmount': 0.239646,
		'usdValue': 4840.91092,
		'amount': 4840.91092,
		'token': 'YUSD',
		'tx': '0x89f2dd2a9b316a0688c9be0aea2ce30ab2ba584506fab3ada65b93e311307d57',
	},
	{
		'id': 2,
		'timestamp': '2020-11-17 17:30:00',
		'yfiAmount': 0.254446,
		'usdValue': 5139.874732,
		'amount': 5139.874732,
		'token': 'YUSD',
		'tx': '0x89f2dd2a9b316a0688c9be0aea2ce30ab2ba584506fab3ada65b93e311307d57',
	},
	{
		'id': 3,
		'timestamp': '2020-12-01 1:59:00',
		'yfiAmount': 4.256402,
		'usdValue': 110167.7412,
		'amount': 110167.7412,
		'token': 'WETH',
		'tx': '0x898ab224087ec7127435a33ee114e6b392e51cdc82a4409fb9db67775bd1edca',
	},
	{
		'id': 4,
		'timestamp': '2020-12-26 8:29:00',
		'yfiAmount': 2.172542,
		'usdValue': 49792.67834,
		'amount': 49792.67834,
		'token': 'UNI',
		'tx': '0x76dc403213e0bf584a9f9c8a6894efdb15696102e06eba5b4ae811eb68e1594a',
	},
	{
		'id': 5,
		'timestamp': '2020-12-31 7:16:00',
		'yfiAmount': 2.281145,
		'usdValue': 50656.0681,
		'amount': 50656.0681,
		'token': 'YUSD',
		'tx': '0xe5ac989c66e42b8c0a6ea4a138e31ae29511decb7e3a0bdbc1dba61092951dec',
	},
	{
		'id': 6,
		'timestamp': '2021-02-11 18:26:00',
		'yfiAmount': 3,
		'usdValue': 134142.3762,
		'amount': 134142.3762,
		'token': 'WETH',
		'tx': '0x3ba7f549aff129df62cc5b98491d11f57465b6d71627261ef2c9c6e0d54ff9b2',
	},
	{
		'id': 7,
		'timestamp': '2021-03-23 16:27:00',
		'yfiAmount': 1.180195,
		'usdValue': 39498.91381,
		'amount': 39498.91381,
		'token': 'USDC',
		'tx': '0xa121fd9717d0fb4ac72a223db638f4e59094547ddee253e5ba011a5bb0c67126',
	},
	{
		'id': 8,
		'timestamp': '2021-03-25 13:18:00',
		'yfiAmount': 6.180626,
		'usdValue': 190454.3149,
		'amount': 190454.3149,
		'token': 'USDC',
		'tx': '0x6b03dc7095e693f399c862705f9095d1dac92f7d1f84a6fefdba1e877c965cce',
	},
	{
		'id': 9,
		'timestamp': '2021-04-07 19:08:00',
		'yfiAmount': 5.169962,
		'usdValue': 200646.8541,
		'amount': 200646.8541,
		'token': 'USDC',
		'tx': '0xc8a7d4719e84b061a9557e9a4ddc540e8d04455fbbe0a7a855cf81dd23e3f595',
	},
	{
		'id': 10,
		'timestamp': '2021-04-10 5:30:00',
		'yfiAmount': 0.730798,
		'usdValue': 32895.87739,
		'amount': 32895.87739,
		'token': 'USDC',
		'tx': '0xf401d432dcaaea39e1b593379d3d63dcdc82f5f694d83b098bb6110eaa19bbde',
	},
	{
		'id': 11,
		'timestamp': '2021-04-14 12:19:00',
		'yfiAmount': 5.558643,
		'usdValue': 249624.3765,
		'amount': 249624.3765,
		'token': 'USDC',
		'tx': '0xea25b0ecceeade5039be3c864a440a27dde70b72c85ba8a399c56bde1e21bdf2',
	},
];

function	RowHead({sortBy, set_sortBy}) {
	return (
		<div className={'flex flex-row py-3 px-6 w-full bg-gray-blue-3 rounded-sm'}>
			<div className={'pr-4'}>
				<div className={'flex flex-row items-center w-42'}>
					<p className={'pr-1 text-gray-blue-1'}>{'Timestamp'}</p>
					<div
						onClick={() => set_sortBy(n => n === 'time' ? '-time' : n === '-time' ? '' : 'time')}
						className={`p-1 -m-1 cursor-pointer transition-all transform ${sortBy === 'time' ? 'text-dark-blue-1 pt-2' : sortBy === '-time' ? 'text-dark-blue-1 rotate-180 pb-2' : 'text-gray-blue-2 hover:text-dark-blue-1 hover:opacity-60 pt-2'}`}>
						<IconArrowDown />
					</div>
				</div>
			</div>
			<div className={'pr-8'}>
				<div className={'flex flex-row items-center w-42'}>
					<p className={'pr-1 text-gray-blue-1'}>{'YFI Amount'}</p>
					<div
						onClick={() => set_sortBy(n => n === 'yfi' ? '-yfi' : n === '-yfi' ? '' : 'yfi')}
						className={`p-1 -m-1 cursor-pointer transition-all transform ${sortBy === 'yfi' ? 'text-dark-blue-1 pt-2' : sortBy === '-yfi' ? 'text-dark-blue-1 rotate-180 pb-2' : 'text-gray-blue-2 hover:text-dark-blue-1 hover:opacity-60 pt-2'}`}>
						<IconArrowDown />
					</div>
				</div>
			</div>
			<div className={'pr-6'}>
				<div className={'flex flex-row items-center w-38'}>
					<p className={'pr-1 text-gray-blue-1'}>{'Value'}</p>
					<div
						onClick={() => set_sortBy(n => n === 'value' ? '-value' : n === '-value' ? '' : 'value')}
						className={`p-1 -m-1 cursor-pointer transition-all transform ${sortBy === 'value' ? 'text-dark-blue-1 pt-2' : sortBy === '-value' ? 'text-dark-blue-1 rotate-180 pb-2' : 'text-gray-blue-2 hover:text-dark-blue-1 hover:opacity-60 pt-2'}`}>
						<IconArrowDown />
					</div>
				</div>
			</div>
			<div className={'pr-6'}>
				<div className={'w-50 text-gray-blue-1'}>{'Amount'}</div>
			</div>
			<div className={'pr-8'}>
				<div className={'w-28 text-gray-blue-1'}>{'Token'}</div>
			</div>
			<div className={'pr-14'}>
				<div className={'w-48 text-gray-blue-1'}>{'Tx Hash'}</div>
			</div>
		</div>
	);
}

function	Row({row}) {
	const	[isUriCopied, set_isUriCopied] = React.useState(false);
	return (
		<>
			<div className={'mr-4'}>
				<div className={'w-42 tabular-nums text-gray-blue-1'}>{formatDate(new Date(row.timestamp))}</div>
			</div>
			<div className={'mr-8'}>
				<div className={'w-42 tabular-nums text-gray-blue-1'}>{formatAmount(row.yfiAmount, 12)}</div>
			</div>
			<div className={'mr-6'}>
				<div className={'w-38 tabular-nums text-gray-blue-1'}>{`$ ${formatAmount(row.usdValue)}`}</div>
			</div>
			<div className={'mr-6'}>
				<div className={'w-50 tabular-nums text-gray-blue-1'}>{formatAmount(row.amount, 12)}</div>
			</div>
			<div className={'mr-8'}>
				<div className={'w-28 text-gray-blue-1'}>{row.token}</div>
			</div>
			<div className={'mr-6'}>
				<div className={'w-48 tabular-nums text-gray-blue-1'}>{truncateHex(row.tx, 9)}</div>
			</div>
			<div
				onClick={(e) => {
					e.stopPropagation();
					set_isUriCopied(true);
					navigator.clipboard.writeText(`https://etherscan.io/tx/${row.tx}`);
					setTimeout(() => set_isUriCopied(false), 1500);

				}}
				className={`p-2 -m-1 -ml-1.5 ${isUriCopied ? 'text-yearn-blue hover:text-yearn-blue cursor-auto' : 'text-gray-blue-1 hover:text-gray-blue-2 cursor-copy'} transition-colors`}>
				<IconCopy />
			</div>
		</>
	);
}

function	RowFooter({data}) {
	return (
		<div className={'flex flex-row items-center py-3 px-6 w-full bg-gray-blue-3 rounded-sm'}>
			<div className={'mr-4'}>
				<div className={'w-42 font-bold tabular-nums text-dark-blue-1'}>{'Total'}</div>
			</div>
			<div className={'mr-8'}>
				<div className={'w-42 font-bold tabular-nums text-dark-blue-1'}>{formatAmount(sum(...data.map(e => e.yfiAmount)), 12)}</div>
			</div>
			<div className={'mr-6'}>
				<div className={'w-38 font-bold tabular-nums text-dark-blue-1'}>{`$ ${formatAmount(sum(...data.map(e => e.usdValue)), 2)}`}</div>
			</div>
			<div className={'mr-6'}>
				<div className={'w-50'}>{''}</div>
			</div>
			<div className={'mr-8'}>
				<div className={'w-28'}>{''}</div>
			</div>
			<div className={'ml-2'}>
				<div className={'flex justify-end w-56'}>
					<button className={'button-small button-filled'}>
						<p className={'font-normal'}>{'Export CSV'}</p>
					</button>
				</div>
			</div>
		</div>
	);
}

function	Index() {
	const	[sortBy, set_sortBy] = React.useState('time');
	const	[sortedData, set_sortedData] = React.useState([...someData]);

	React.useEffect(() => {
		let _data = someData.map(a => {return {...a};});

		if (sortBy === 'time') {
			_data = sortByKey(_data, 'timestamp', -1);
		} else if (sortBy === 'yfi') {
			_data = sortByKey(_data, 'yfiAmount', -1);
		} else if (sortBy === 'value') {
			_data = sortByKey(_data, 'usdValue', -1);
		}
		set_sortedData(_data);
	}, [sortBy]);

	return (
		<div className={'w-full'}>
			<div className={'flex justify-between items-center p-6 my-4 w-full h-20 bg-white rounded-sm'}>
				<div className={'flex flex-row items-center'}>
					<h2 className={'mr-4 font-roboto text-lg font-bold text-dark-blue-1'}>
						{'YFI Buyback'}
					</h2>
					<p className={'text-lg text-gray-blue-1'}>
						{'Last update: 05.01.2022 18:38:15'}
					</p>
				</div>
				<div className={'flex flex-row items-center space-x-6'}>
					<p className={'text-yearn-blue'}>{'YFI $ 33,576'}</p>
					<p className={'text-yearn-blue'}>{'Balance: 0 YFI'}</p>
					<button className={'button-small button-light'}>{'Buy YFI'}</button>
					<button className={'button-small button-light'}>{'hentai.eth'}</button>
				</div>
			</div>

			<div>
				<RowHead sortBy={sortBy} set_sortBy={set_sortBy} />
				<FlipMove duration={250} easing={'ease-in-out'} enterAnimation={'none'}>
					{sortedData?.map((row, index) => (
						<div key={row.id} className={`flex flex-row py-3 px-6 w-full items-center ${index % 2 ? 'bg-white' : 'bg-white-blue-1'} rounded-sm relative mb-0.5`}>
							<Row row={row} />
						</div>
					))}
				</FlipMove>
				<RowFooter data={someData} />
			</div>

		</div>
	);
}

export default Index;
