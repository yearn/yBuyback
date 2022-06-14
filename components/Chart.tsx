import	React, {ReactElement}	from	'react';
import	Chart					from	'chart.js/auto';
import	{Bar}					from	'react-chartjs-2';

//We have to do that to avoid a weird issue with Chartjs
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
function	doNothing() {
	Chart;
}

const getOrCreateLegendList = (_: unknown, id: string): HTMLUListElement | null => {
	if (typeof(window) === 'undefined') return null;
	const legendContainer = document.getElementById(id);
	if (legendContainer) {
		let listContainer = legendContainer.querySelector('ul');
		if (!listContainer) {
			listContainer = document.createElement('ul');
			listContainer.style.display = 'flex';
			listContainer.style.justifyContent = 'space-between';
			listContainer.style.flexDirection = 'row';
			listContainer.style.margin = '0px';
			listContainer.style.padding = '0px';
			legendContainer.appendChild(listContainer);
		}
		return listContainer;
	}
	return null;
};
  
const htmlLegendPlugin = {
	id: 'htmlLegend',
	afterUpdate(chart: any, _: never, options: any): void {
		const ul = getOrCreateLegendList(chart, options.containerID);
		if (!ul) return;
  
		// Remove old legend items
		while (ul.firstChild) {
			ul.firstChild.remove();
		}
  
		// Reuse the built-in legendItems generator
		const items = chart.options.plugins.legend.labels.generateLabels(chart);
		items.forEach((item: any): void => {
			const li = document.createElement('li');
			li.style.alignItems = 'center';
			li.style.cursor = 'pointer';
			li.style.display = 'flex';
			li.style.flexDirection = item.text === '$, m' ? 'row-reverse' : 'row';
			li.style.marginLeft = '0px';
  
			li.onclick = (): void => {
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
			textContainer.className = 'text-accent-500 font-bold text-sm';
			textContainer.style.margin = '0px';
			textContainer.style.padding = '0px';
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
		mode: 'index'
	},
	scales: {
		x: {
			stacked: true,
			grid: {
				display: false,
				drawBorder: false
			}
		},
		y: {
			beginAtZero: true,
			grid: {
				display: false,
				drawBorder: false
			},
			min: 0,
			max: 200
		},
		usd: {
			beginAtZero: true,
			grid: {
				display: false,
				drawBorder: false
			},
			type: 'linear',
			position: 'right'
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
			footerColor: '#001746'
		},
		htmlLegend: {
			containerID: 'legend-container'
		},
		legend: {
			display: false
		}
	}
};

const BuybackChart = React.memo(function BuybackChart({graphData}: {graphData: any}): ReactElement {
	const	chartRef = React.useRef(null);
	const	data = {
		labels: Object.values(graphData).map(({datePeriod}: any): string => datePeriod),
		datasets: [
			{
				type: 'bar',
				label: 'YFI',
				borderColor: '#E0EAFF',
				backgroundColor: '#0657F9',
				barPercentage: 0.7,
				data: Object.values(graphData).map(({yfiAmount}: any): number => Number(yfiAmount))
			},
			{
				type: 'bar',
				label: '$, m',
				yAxisID: 'usd',
				backgroundColor: '#E0EAFF',
				borderWidth: 0,
				barPercentage: 1,
				data: Object.values(graphData).map(({usdValue}: any): number => Number(usdValue / 1_000_000))
			}
		]
	};

	return (
		<div className={'h-102'}>
			<div id={'legend-container'} />
			<span onClick={doNothing} className={'hidden'} />
			<div className={'px-6 mt-4'}>
				<Bar
					style={{height: 376, maxHeight: 376}}
					ref={chartRef}
					options={desktopGraphOptions as any}
					plugins={[htmlLegendPlugin]}
					data={data as any} />
			</div>
		</div>
	);
});

export default BuybackChart;