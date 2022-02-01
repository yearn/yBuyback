import	React					from	'react';
import	FlipMove				from	'react-flip-move';
import	{Parser}				from	'json2csv';
import	usePrices				from	'contexts/usePrices';
import	BuybackChart			from	'components/Chart';
import	IconArrowDown			from	'components/icons/IconArrowDown';
import	IconLinkOut				from	'components/icons/IconLinkOut';
import	{getBuybacks}			from	'pages/api/buyback-as-json';
import	* as utils				from	'utils';

const Rows = React.memo(function Rows({sortedData}) {
	const	{prices} = usePrices();

	return (
		<FlipMove duration={250} easing={'ease-in-out'} enterAnimation={'none'} className={'overflow-scroll adapted-height scrollbar-none'}>
			{sortedData?.map((row, index) => (
				<div key={row.id} className={`grid-row ${index % 2 ? 'bg-white' : 'bg-white-blue-1'}`}>
					<div className={'items-start min-w-32 row-3'}>
						<div className={'tabular-nums text-gray-blue-1'}>{utils.formatDate(new Date(row?.timestamp?.replace(/-/g, '/') || ''))}</div>
					</div>
					<div className={'justify-end items-start min-w-36 row-3'}>
						<div className={'cell-right'}>{utils.formatAmount(row.yfiAmount, 12, 8)}</div>
					</div>
					<div className={'justify-end items-start min-w-36 row-4'}>
						<div className={'cell-right'}>
							<p>{`$ ${utils.formatAmount(row.usdValue)}`}</p>
							<p className={'text-sm'}>{`${utils.formatAmount(row.tokenAmount, 12)} ${row.token}`}</p>
						</div>
					</div>
					<div className={'justify-end items-start min-w-36 row-4'}>
						<div className={'cell-right'}>{`$ ${utils.formatAmount(row.usdValue / row.yfiAmount)}`}</div>
					</div>
					<div className={'justify-end items-start min-w-36 row-4'}>
						<div className={'cell-right'}>
							{`$ ${utils.formatAmount((prices?.['yearn-finance']?.usd || 0) - (row.usdValue / row.yfiAmount))}`}
						</div>
					</div>
					<div className={'items-center min-w-32 row-4'}>
						<div className={'flex flex-row justify-end items-center w-full'}>
							<div>
								<a href={`https://etherscan.io/tx/${row.hash}`} target={'_blank'} rel={'noreferrer'}>
									<div className={'text-gray-blue-1 link'}>
										<IconLinkOut className={'w-4 h-4'} />
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			))}
		</FlipMove>
	);
});

function	RowHead({sortBy, set_sortBy}) {
	return (
		<div className={'grid sticky top-0 z-10 grid-cols-22 py-3 px-6 w-max bg-gray-blue-3 rounded-sm md:w-full'}>
			<div className={'flex flex-row col-span-3 min-w-32'}>
				<p className={'pr-1 text-gray-blue-1'}>{'Timestamp'}</p>
				<div
					onClick={() => set_sortBy(n => n === 'time' ? '-time' : n === '-time' ? '' : 'time')}
					className={`p-1 -m-1 cursor-pointer transition-all transform ${sortBy === 'time' ? 'text-dark-blue-1 pt-2' : sortBy === '-time' ? 'text-dark-blue-1 rotate-180 pb-2' : 'text-gray-blue-2 hover:text-dark-blue-1 hover:opacity-60 pt-2'}`}>
					<IconArrowDown />
				</div>
			</div>
			<div className={'flex flex-row col-span-3 justify-end min-w-36'}>
				<p className={'pr-1 text-gray-blue-1'}>{'YFI amount'}</p>
				<div
					onClick={() => set_sortBy(n => n === 'yfi' ? '-yfi' : n === '-yfi' ? '' : 'yfi')}
					className={`p-1 -m-1 cursor-pointer transition-all transform ${sortBy === 'yfi' ? 'text-dark-blue-1 pt-2' : sortBy === '-yfi' ? 'text-dark-blue-1 rotate-180 pb-2' : 'text-gray-blue-2 hover:text-dark-blue-1 hover:opacity-60 pt-2'}`}>
					<IconArrowDown />
				</div>
			</div>
			<div className={'flex flex-row col-span-4 justify-end min-w-36'}>
				<p className={'pr-1 text-gray-blue-1'}>{'USD value'}</p>
				<div
					onClick={() => set_sortBy(n => n === 'value' ? '-value' : n === '-value' ? '' : 'value')}
					className={`p-1 -m-1 cursor-pointer transition-all transform ${sortBy === 'value' ? 'text-dark-blue-1 pt-2' : sortBy === '-value' ? 'text-dark-blue-1 rotate-180 pb-2' : 'text-gray-blue-2 hover:text-dark-blue-1 hover:opacity-60 pt-2'}`}>
					<IconArrowDown />
				</div>
			</div>
			<div className={'flex flex-row col-span-4 justify-end min-w-36'}>
				<div className={'text-right text-gray-blue-1'}>{'Price per YFI'}</div>
			</div>
			<div className={'flex flex-row col-span-4 justify-end min-w-36'}>
				<div className={'text-right text-gray-blue-1'}>{'Price delta'}</div>
			</div>
			<div className={'flex flex-row col-span-4 justify-end min-w-32'} />
		</div>
	);
}

function	RowFooter({data}) {
	function	prepareCSV() {
		const	fields = ['id', 'timestamp', 'yfiAmount', 'usdValue', 'tokenAmount', 'token', 'hash'];
		try {
			const	parser = new Parser({fields});
			const	csv = parser.parse(data);
			const	csvFile = new Blob([csv], {type: 'text/csv'});
			const	downloadLink = document.createElement('a');
			downloadLink.download = 'yfi-buyback.csv';
			downloadLink.href = window.URL.createObjectURL(csvFile);
			downloadLink.style.display = 'none';
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		} catch (err) {
			console.error(err);
		}
		
	}

	function	computeAvegagePrice() {
		let	sum = 0;
		for (let index = 0; index < data.length; index++) {
			sum += data[index].usdValue / data[index].yfiAmount;
		}
		return sum / data.length;
	}

	return (
		<div className={'grid sticky bottom-0 z-10 grid-cols-22 items-center py-3 px-6 w-max bg-gray-blue-3 rounded-sm md:w-full'}>
			<div className={'col-span-3 min-w-36'}>
				<div className={'font-bold tabular-nums text-dark-blue-1'}>{'Total:'}</div>
			</div>
			<div className={'justify-end items-start min-w-36 row-3'}>
				<div className={'font-bold tabular-nums text-right text-dark-blue-1'}>{`${utils.formatAmount(utils.sum(...data.map(e => e.yfiAmount)), 12, 8)}`}</div>
			</div>
			<div className={'justify-end items-start min-w-36 row-4'}>
				<div className={'font-bold tabular-nums text-right text-dark-blue-1'}>{`$ ${utils.formatAmount(utils.sum(...data.map(e => e.usdValue)), 2)}`}</div>
			</div>
			<div className={'justify-end items-start min-w-36 row-4'}>
				<div className={'font-bold tabular-nums text-right text-dark-blue-1'}>
					{`Avg. price: $ ${utils.formatAmount(computeAvegagePrice())}`}
				</div>
			</div>
			<div className={'col-span-4 min-w-36'}>
				<div className={''}>{''}</div>
			</div>
			<div className={'justify-end min-w-32 row-4'}>
				<button
					onClick={prepareCSV}
					className={'button-small button-filled'}>
					<p className={'font-normal'}>{'Export CSV'}</p>
				</button>
			</div>
		</div>
	);
}

function	Index({data}) {
	const	[sortBy, set_sortBy] = React.useState('time');
	const	[sortedData, set_sortedData] = React.useState([...data].reverse());
	const	[graphData, set_graphData] = React.useState([]);
	const	[totalInfo, set_totalInfo] = React.useState({yfiAmount: 0, usdValue: 0});

	React.useEffect(() => {
		let _data = data.map(a => {return {...a};});

		if (sortBy === 'time') {
			_data = utils.sortByKey(_data, 'timestamp', -1);
		} else if (sortBy === 'yfi') {
			_data = utils.sortByKey(_data, 'yfiAmount', -1);
		} else if (sortBy === 'value') {
			_data = utils.sortByKey(_data, 'usdValue', -1);
		}
		set_sortedData(_data);
	}, [sortBy, data]);

	React.useEffect(() => {
		let _data = data.map(a => {return {...a};});

		let		totalYfiAmount = 0;
		let		totalUSDValue = 0;
		const	arr = {};

		const	start = new Date(1604185201000);
		const	end = new Date();
		for (let date = start; date <= end; date.setMonth(date.getMonth() + 1)) {
			const	year = date.getFullYear();
			const	month = date.getMonth() + 1;
			const	monthStr = month < 10 ? `0${month}` : `${month}`;
			const	datePeriod = new Intl.DateTimeFormat('en-US', {month: 'short', year: 'numeric'}).format(date);
			const	key = `${year}-${monthStr}`;
			arr[key] = {
				datePeriod,
				yfiAmount: 0,
				usdValue: 0,
			};
		}

		for (let index = 0; index < _data.length; index++) {
			const	row = _data[index];
			const	year = new Date(row.timestamp).getFullYear();
			let		month = (new Date(row.timestamp).getMonth()) + 1;
			if (month < 10)
				month = `0${month}`;
			const	datePeriodKey = `${year}-${month}`;
			const	datePeriod = new Intl.DateTimeFormat('en-US', {month: 'short', year: 'numeric'}).format(new Date(row.timestamp));
			if (!arr[datePeriodKey]) {
				arr[datePeriodKey] = {
					datePeriod,
					yfiAmount: 0,
					usdValue: 0,
				};
			}
			arr[datePeriodKey].yfiAmount += row.yfiAmount;
			totalYfiAmount += row.yfiAmount;
			arr[datePeriodKey].usdValue += row.usdValue;
			totalUSDValue += row.usdValue;
		}
		
		set_graphData(arr);
		set_totalInfo({yfiAmount: totalYfiAmount, usdValue: totalUSDValue});
	}, [data]);

	return (
		<div className={'w-full'}>
			<div className={'hidden p-6 mb-4 w-full h-136 bg-white rounded-sm md:block'}>
				<div className={'flex flex-row mb-6 space-x-11'}>
					<div className={'flex flex-col'}>
						<p className={'mb-2 text-gray-blue-1'}>{'Buyback over time'}</p>
						<p className={'text-xl font-bold text-dark-blue-1'}>
							{`${utils.formatAmount(totalInfo.yfiAmount)} YFI`}
						</p>
					</div>
					<div className={'flex flex-col'}>
						<p className={'mb-2 text-gray-blue-1'}>{'In USD'}</p>
						<p className={'text-xl font-bold text-dark-blue-1'}>
							{`$ ${utils.formatAmount(totalInfo.usdValue)}`}
						</p>
					</div>
				</div>
				<BuybackChart graphData={graphData} />
			</div>
			<div className={'grid overflow-x-scroll relative h-table-wrapper md:block md:h-auto scrollbar-none'}>
				<RowHead sortBy={sortBy} set_sortBy={set_sortBy} />
				<Rows sortedData={sortedData} />
				<RowFooter data={data} />
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	return {props: {data: await getBuybacks()}};
}
  
export default Index;
