import	React					from	'react';
import	FlipMove				from	'react-flip-move';
import	{Parser}				from	'json2csv';
import	usePrices				from	'contexts/usePrices';
import	IconArrowDown			from	'components/icons/IconArrowDown';
import	IconLinkOut				from	'components/icons/IconLinkOut';
import	{getBuybacks}			from	'pages/api/buyback-as-json';
import	* as utils				from	'utils';
// eslint-disable-next-line no-unused-vars
import	Chart							from	'chart.js/auto';
import	{Bar}							from	'react-chartjs-2';

const getOrCreateLegendList = (_, id) => {
	if (typeof(window) === 'undefined') return;
	const legendContainer = document.getElementById(id);
	let listContainer = legendContainer.querySelector('ul');
	if (!listContainer) {
		listContainer = document.createElement('ul');
		listContainer.style.display = 'flex';
		listContainer.style.justifyContent = 'space-between';
		listContainer.style.flexDirection = 'row';
		listContainer.style.margin = 0;
		listContainer.style.padding = 0;
		legendContainer.appendChild(listContainer);
	}
  
	return listContainer;
};
  
const htmlLegendPlugin = {
	id: 'htmlLegend',
	afterUpdate(chart, _, options) {
		const ul = getOrCreateLegendList(chart, options.containerID);
  
		// Remove old legend items
		while (ul.firstChild) {
			ul.firstChild.remove();
		}
  
		// Reuse the built-in legendItems generator
		const items = chart.options.plugins.legend.labels.generateLabels(chart);
  
		items.forEach((item) => {
			const li = document.createElement('li');
			li.style.alignItems = 'center';
			li.style.cursor = 'pointer';
			li.style.display = 'flex';
			li.style.flexDirection = item.text === '$, m' ? 'row-reverse' : 'row';
			li.style.marginLeft = '0px';
  
			li.onclick = () => {
				chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
				chart.update();
			};
  
			// Color box
			const boxSpan = document.createElement('span');
			boxSpan.style.background = item.fillStyle;
			boxSpan.style.borderColor = item.strokeStyle;
			boxSpan.style.borderWidth = item.lineWidth + 'px';
			boxSpan.style.display = 'inline-block';
			boxSpan.style.marginRight = item.text === '$, m' ? '0px' : '8px';
			boxSpan.style.marginLeft = item.text === '$, m' ? '8px' : '0px';
			boxSpan.style.height = '16px';
			boxSpan.style.width = '16px';
			boxSpan.style.borderRadius = '2px';
  
			// Text
			const textContainer = document.createElement('p');
			textContainer.className = 'text-yearn-blue font-bold text-sm';
			textContainer.style.margin = 0;
			textContainer.style.padding = 0;
			textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
  
			const text = document.createTextNode(item.text);
			textContainer.appendChild(text);
  
			li.appendChild(boxSpan);
			li.appendChild(textContainer);
			ul.appendChild(li);
		});
	}
};


const	desktopGraphOptions = {
	responsive: true,
	animation: true,
	categoryPercentage: 1,
	barPercentage: 1,
	interaction: {
		intersect: false,
		mode: 'index',
	},
	scales: {
		x: {
			stacked: true,
			grid: {
				display: false,
				drawBorder: false,
			}
		},
		y: {
			beginAtZero: true,
			grid: {
				display: false,
				drawBorder: false,
			},
			min: 0,
			max: 200,
		},
		usd: {
			beginAtZero: true,
			grid: {
				display: false,
				drawBorder: false,
			},
			type: 'linear',
			position: 'right',
		}
	},
	elements: {
		point: {radius: 0},
		line: {borderWidth: 4}
	},
	plugins: {
		title: {display: false},
		chartAreaBorder: {borderColor: '#FFFFFF'},
		tooltip: {
			display: true,
			enabled: true,
			position: 'nearest',
			backgroundColor: '#FFFFFF',
			borderColor: '#7F8DA980',
			borderWidth: 1,
			cornerRadius: 2,
			padding: 8,
			titleColor: '#001746',
			titleMarginBottom: 8,
			bodyColor: '#001746',
			footerColor: '#001746',
		},
		htmlLegend: {
			containerID: 'legend-container',
		},
		legend: {
			display: false,
		}
	},
};

const BuybackChart = React.memo(function BuybackChart({graphData}) {
	const	chartRef = React.useRef(null);
	const	data = {
		labels: Object.values(graphData).map(({datePeriod}) => datePeriod),
		datasets: [
			{
				type: 'bar',
				label: 'YFI',
				borderColor: '#E0EAFF',
				backgroundColor: '#0657F9',
				barPercentage: 0.7,
				data: Object.values(graphData).map(({yfiAmount}) => yfiAmount),
			},
			{
				type: 'bar',
				label: '$, m',
				yAxisID: 'usd',
				backgroundColor: '#E0EAFF',
				borderWidth: 0,
				barPercentage: 1,
				data: Object.values(graphData).map(({usdValue}) => usdValue / 1_000_000),
			}
		]
	};

	return (
		<div className={'h-102'}>
			<div id={'legend-container'} />
			<div className={'px-6 mt-4'}>
				<Bar
					style={{height: 376, maxHeight: 376}}
					ref={chartRef}
					options={desktopGraphOptions}
					plugins={[htmlLegendPlugin]}
					data={data} />
			</div>
		</div>
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

function	Row({row}) {
	const	{prices} = usePrices();

	return (
		<>
			<div className={'flex col-span-3 items-start min-w-32'}>
				<div className={'tabular-nums text-gray-blue-1'}>{utils.formatDate(new Date(row?.timestamp?.replace(/-/g, '/') || ''))}</div>
			</div>
			<div className={'flex col-span-3 justify-end items-start min-w-36'}>
				<div className={'tabular-nums text-right text-gray-blue-1'}>{utils.formatAmount(row.yfiAmount, 12, 8)}</div>
			</div>
			<div className={'flex col-span-4 justify-end items-start min-w-36'}>
				<div className={'tabular-nums text-right text-gray-blue-1'}>
					<p>{`$ ${utils.formatAmount(row.usdValue)}`}</p>
					<p className={'text-sm'}>{`${utils.formatAmount(row.tokenAmount, 12)} ${row.token}`}</p>
				</div>
			</div>
			<div className={'flex col-span-4 justify-end items-start min-w-36'}>
				<div className={'tabular-nums text-right text-gray-blue-1'}>{`$ ${utils.formatAmount(row.usdValue / row.yfiAmount)}`}</div>
			</div>
			<div className={'flex col-span-4 justify-end items-start min-w-36'}>
				<div className={'tabular-nums text-right text-gray-blue-1'}>
					{`$ ${utils.formatAmount((prices?.['yearn-finance']?.usd || 0) - (row.usdValue / row.yfiAmount))}`}
				</div>
			</div>
			<div className={'flex col-span-4 items-center min-w-32'}>
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
		</>
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
			<div className={'flex col-span-3 justify-end items-start min-w-36'}>
				<div className={'font-bold tabular-nums text-right text-dark-blue-1'}>{`${utils.formatAmount(utils.sum(...data.map(e => e.yfiAmount)), 12, 8)}`}</div>
			</div>
			<div className={'flex col-span-4 justify-end items-start min-w-36'}>
				<div className={'font-bold tabular-nums text-right text-dark-blue-1'}>{`$ ${utils.formatAmount(utils.sum(...data.map(e => e.usdValue)), 2)}`}</div>
			</div>
			<div className={'flex col-span-4 justify-end items-start min-w-36'}>
				<div className={'font-bold tabular-nums text-right text-dark-blue-1'}>
					{`Avg. price: $ ${utils.formatAmount(computeAvegagePrice())}`}
				</div>
			</div>
			<div className={'col-span-4 min-w-36'}>
				<div className={''}>{''}</div>
			</div>
			<div className={'flex col-span-4 justify-end min-w-32'}>
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
			<div className={'grid overflow-x-scroll relative h-table-wrapper md:block md:h-auto'}>
				<RowHead sortBy={sortBy} set_sortBy={set_sortBy} />
				<FlipMove duration={250} easing={'ease-in-out'} enterAnimation={'none'} className={'overflow-scroll adapted-height'}>
					{sortedData?.map((row, index) => (
						<div key={row.id} className={`grid grid-cols-22 w-max md:w-full py-3 px-6 ${index % 2 ? 'bg-white' : 'bg-white-blue-1'} rounded-sm relative mb-0.5`}>
							<Row row={row} />
						</div>
					))}
				</FlipMove>
				<RowFooter data={data} />
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	return {props: {data: await getBuybacks()}};
}
  
export default Index;
