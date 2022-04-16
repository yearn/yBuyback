import	React, {ReactElement}			from	'react';
import	{GetServerSideProps}			from	'next';
import	{Parser}						from	'json2csv';
import	{LinkOut}						from	'@yearn/web-lib/icons';
import	{Card}							from	'@yearn/web-lib/components';
import	{List}							from	'@yearn/web-lib/layouts';
import	{format}						from	'@yearn/web-lib/utils';
import	{usePrices}						from	'@yearn/web-lib/contexts';
import	BuybackChart					from	'components/Chart';
import	{TableHead, TableHeadCell}		from	'components/TableHeadCell';
import type {TTableHead}				from	'components/TableHeadCell';
import	{getBuybacks}					from	'pages/api/buyback-as-json';
import	{sortByKey, sum, toSafeDate}	from	'utils';

type		TRowElement = {
	data: any,
	index: number,
	tokenPrice: number
}
type		TGraphDataElement = {
	datePeriod: string;
	yfiAmount: number;
	usdValue: number;
}
type		TGraphData = {
	[key: string]: TGraphDataElement
}

function	RowElement({data, index, tokenPrice}: TRowElement): ReactElement {
	return (
		<div
			className={`grid grid-cols-22 py-4 px-6 w-[1200px] md:w-full ${index % 2 ? 'bg-surface' : 'bg-background'}`}>
			<div className={'items-start min-w-32 row-3'}>
				<div className={'tabular-nums text-typo-secondary'}>{format.date(toSafeDate(data.timestamp))}</div>
			</div>
			<div className={'min-w-36 cell-end row-3'}>
				<div className={'cell-right'}>{format.amount(data.yfiAmount, 8, 8)}</div>
			</div>
			<div className={'min-w-36 cell-end row-4'}>
				<div className={'cell-right'}>
					<p>{`$ ${format.amount(data.usdValue, 2)}`}</p>
					<p className={'text-sm text-typo-secondary'}>{`${format.amount(data.tokenAmount, 2)} ${data.token}`}</p>
				</div>
			</div>
			<div className={'min-w-36 cell-end row-4'}>
				<div className={'cell-right'}>{`$ ${format.amount(data.usdValue / data.yfiAmount, 2)}`}</div>
			</div>
			<div className={'min-w-36 cell-end row-4'}>
				<div className={'cell-right'}>
					{`$ ${format.amount(tokenPrice - (data.usdValue / data.yfiAmount))}`}
				</div>
			</div>
			<div className={'items-center min-w-32 row-4'}>
				<div className={'flex flex-row justify-end items-center w-full'}>
					<div>
						<a href={`https://etherscan.io/tx/${data.hash}`} target={'_blank'} rel={'noreferrer'}>
							<div className={'text-typo-secondary link'}>
								<LinkOut className={'w-4 h-4'} />
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

const		RowsWrapper = React.memo(function RowsWrapper({sortedData}: any): ReactElement {
	const	{prices} = usePrices();
	const	[tokenPrice, set_tokenPrice] = React.useState(0);

	React.useEffect((): void => {
		set_tokenPrice(Number(prices?.['yearn-finance']?.usd || 0));
	}, [prices]);

	return (
		<div className={'overflow-scroll w-[1200px] adapted-height scrollbar-none'}>
			<List.Animated>
				{sortedData?.map((row: any, index: number): ReactElement => (
					<div key={row.id}>
						<RowElement data={row} index={index} tokenPrice={tokenPrice} />
					</div>
				))}
			</List.Animated>
		</div>
	);
});

/* 🔵 - Yearn Finance **********************************************************
** This will render the head of the fake table we have, with the sortable
** elements. This component asks for sortBy and set_sortBy in order to handle
** the chevron displays and to set the sort based on the user's choice.
******************************************************************************/
function	RowHead({sortBy, set_sortBy}: TTableHead): ReactElement {
	return (
		<TableHead
			sortBy={sortBy}
			set_sortBy={set_sortBy}>
			<TableHeadCell
				className={'col-span-3 min-w-32 cell-start'}
				label={'Timestamp'}
				sortId={'time'} />
			<TableHeadCell
				className={'col-span-3 min-w-36 cell-end'}
				label={'YFI amount'}
				sortId={'yfi'} />
			<TableHeadCell
				className={'col-span-4 min-w-36 cell-end'}
				label={'USD value'}
				sortId={'value'} />
			<TableHeadCell
				className={'col-span-4 min-w-36 cell-end'}
				label={'Price per YFI'} />
			<TableHeadCell
				className={'col-span-4 min-w-36 cell-end'}
				label={'Price delta'} />
		</TableHead>
	);
}

function	RowFooter({data}: {data: TGraphDataElement[]}): ReactElement {
	function	prepareCSV(): void {
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

	function	computeAvegagePrice(): number {
		let	sum = 0;
		for (const element of data) {
			sum += element.usdValue / element.yfiAmount;
		}
		return sum / data.length;
	}

	return (
		<div className={'grid sticky bottom-0 z-10 grid-cols-22 items-center py-3 px-6 w-[1200px] md:w-full dark:bg-surface bg-typo-off'}>
			<div className={'col-span-3 min-w-36'}>
				<div className={'font-bold tabular-nums text-dark-blue-1'}>{'Total:'}</div>
			</div>
			<div className={'justify-end items-start min-w-36 row-3'}>
				<div className={'font-bold tabular-nums text-right text-dark-blue-1'}>
					{`${format.amount(sum(data.map((e: TGraphDataElement): number => e.yfiAmount)), 12, 8)}`}
				</div>
			</div>
			<div className={'justify-end items-start min-w-36 row-4'}>
				<div className={'font-bold tabular-nums text-right text-dark-blue-1'}>
					{`$ ${format.amount(sum(data.map((e: TGraphDataElement): number => e.usdValue)), 2)}`}
				</div>
			</div>
			<div className={'justify-end items-start min-w-36 row-4'}>
				<div className={'font-bold tabular-nums text-right text-dark-blue-1'}>
					{`Avg. price: $ ${format.amount(computeAvegagePrice())}`}
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

function	Index({data}: {data: any}): ReactElement | null {
	const	[sortBy, set_sortBy] = React.useState('time');
	const	[sortedData, set_sortedData] = React.useState([...data].reverse());
	const	[graphData, set_graphData] = React.useState<TGraphData>({});
	const	[totalInfo, set_totalInfo] = React.useState({yfiAmount: 0, usdValue: 0});

	React.useEffect((): void => {
		let _data = data.map((a: any): unknown => ({...a}));

		if (sortBy === 'time') {
			_data = sortByKey(_data, 'timestamp', -1);
		} else if (sortBy === 'yfi') {
			_data = sortByKey(_data, 'yfiAmount', -1);
		} else if (sortBy === 'value') {
			_data = sortByKey(_data, 'usdValue', -1);
		}
		set_sortedData(_data);
	}, [sortBy, data]);

	React.useEffect((): void => {
		const _data = data.map((a: any): unknown => ({...a}));

		let		totalYfiAmount = 0;
		let		totalUSDValue = 0;
		const	arr: TGraphData = {};

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
				usdValue: 0
			};
		}

		for (const element of _data) {
			const	row = element;
			const	safeDate = toSafeDate(row.timestamp);
			const	year = safeDate.getFullYear();
			let		month = String((safeDate.getMonth()) + 1);
			if (Number(month) < 10)
				month = `0${month}`;
			const	datePeriodKey = `${year}-${month}`;
			const	datePeriod = new Intl.DateTimeFormat('en-US', {month: 'short', year: 'numeric'}).format(safeDate);
			if (!arr[datePeriodKey]) {
				arr[datePeriodKey] = {
					datePeriod,
					yfiAmount: 0,
					usdValue: 0
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

	if (!sortedData || sortedData.length === 0) {
		return null;
	}

	return (
		<div className={'overflow-x-scroll justify-center items-center mx-auto w-full max-w-6xl'}>
			<Card className={'hidden w-full h-136 md:block'}>
				<div className={'flex flex-row mb-6 space-x-11'}>
					<div className={'flex flex-col'}>
						<p className={'mb-2 text-typo-secondary'}>{'Buyback over time'}</p>
						<p className={'text-xl font-bold text-dark-blue-1'}>
							{`${format.amount(totalInfo.yfiAmount, 4)} YFI`}
						</p>
					</div>
					<div className={'flex flex-col'}>
						<p className={'mb-2 text-typo-secondary'}>{'In USD'}</p>
						<p className={'text-xl font-bold text-dark-blue-1'}>
							{`$ ${format.amount(totalInfo.usdValue, 2)}`}
						</p>
					</div>
				</div>
				{graphData ? <BuybackChart graphData={graphData} /> : null}
			</Card>
			<div className={'flex overflow-x-scroll relative flex-col grid-cols-22 w-[1200px] md:block md:h-auto scrollbar-none'}>
				<RowHead sortBy={sortBy} set_sortBy={set_sortBy} />
				<RowsWrapper sortedData={sortedData} />
				<RowFooter data={data} />
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (): Promise<any> => {
	return {props: {data: await getBuybacks()}};
};

export default Index;
