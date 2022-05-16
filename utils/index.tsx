import	{ethers, BigNumber}	from	'ethers';
import	{format}			from	'@yearn/web-lib/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const sortByKey = (arr: any[], k: string, order = 1): any[] => (
	arr
		.concat()
		.sort((a: any, b: any): number => (
			a[k] > b[k]) ? order : ((a[k] < b[k]) ? -order : 0)
		)
);

export const sum = (args: number[]): number => [...args, 0].reduce((a: number, b: number): number => a + b);

export function toSafeDate(dateAsString: string): Date {
	const [date, time] = dateAsString.split(' ');
	const [year, month, day] = date.split('-');
	const [hour, minute, second] = time.split(':');
	return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
}

export const	toNormalizedValue = (v: string | BigNumber, d?: number): number => (
	Number(format.units(v || 0, d || 18))
);

export const	toNormalizedAmount = (v: string | BigNumber, d?: number, s = 2): string => (
	format.amount(toNormalizedValue(v, d || 18), s, s)
);

export const	toSafeAmount = (v: string, m: BigNumber, d = 18): BigNumber => {
	if (v === format.units(m || 0, d)) {
		return m;
	}
	return ethers.utils.parseUnits(v || '0', d);
};
