import	React, {MutableRefObject, ReactElement}				from	'react';
import	{BigNumber, ethers}					from	'ethers';
import	{format, performBatchedUpdates}		from	'@yearn/web-lib/utils';
import	{toNormalizedValue}					from	'utils';

type 		TInput = {
	value: string,
	onChange: (s: string) => void
	onSearch?: (s: string) => void
	ariaLabel?: string
	withMax?: boolean
	onMaxClick?: () => void
} & React.ComponentPropsWithoutRef<'input'>
function	InputBase({
	value,
	onChange,
	onSearch,
	ariaLabel = 'Search',
	withMax,
	onMaxClick,
	className,
	...props
}: TInput): ReactElement {
	const	focusRef = React.useRef<MutableRefObject<HTMLInputElement | undefined> | any>();
	return (
		<form
			name={ariaLabel}
			onSubmit={(e): void => {
				e.preventDefault();
				if (onSearch)
					onSearch(value);
			}}>
			<div
				aria-label={ariaLabel}
				className={`flex flex-row items-center py-2 h-8 w-full transition-colors ${className}`}>
				<span className={'sr-only'}>{ariaLabel}</span>
				<input
					ref={focusRef}
					value={value}
					onChange={(e): void => onChange(e.target.value)}
					type={'text'}
					className={'p-0 w-full text-xl font-bold bg-white/0 border-none focus:border-none outline-none focus:outline-none focus:ring-0'}
					{...props} />
				{withMax ? <div
					className={'py-1 px-2 ml-2 rounded-lg border transition-colors cursor-pointer border-primary text-primary hover:bg-button-outlined-variant'}
					onClick={(e): void => {
						e.stopPropagation();
						e.preventDefault();
						if (onMaxClick) {
							onMaxClick();
							if (focusRef.current) {
								(focusRef.current as unknown as HTMLInputElement).blur();
							}
						}
					}}>
					{'Max'}
				</div> : null}
			</div>
		</form>
	);
}


type		TInputBigNumber = {
	balance: string
	price: number
	value: string,
	onSetValue: (s: string) => void,
	maxValue?: BigNumber,
	decimals?: number,
	onValueChange?: (s: string) => void,
	withMax?: boolean,
} & React.InputHTMLAttributes<HTMLInputElement>;

function	InputBigNumber({
	balance,
	price,
	value,
	onSetValue,
	maxValue = ethers.constants.Zero,
	withMax = true,
	decimals = 18,
	onValueChange,
	...props
}: TInputBigNumber): ReactElement {
	function	onChange(s: string): void {
		performBatchedUpdates((): void => {
			onSetValue(s);
			if (onValueChange)
				onValueChange(s);
		});
	}
	return (
		<label
			aria-invalid={((value !== '' && Number(value) !== 0) && (!Number(value) || Number(value) > toNormalizedValue(maxValue, decimals)))}
			className={'space-y-1 md:space-y-2'}>
			<p className={'text-sm md:text-base text-typo-secondary'}>{`You have ${balance}`}</p>
			<Input
				value={value}
				type={'number'}
				min={0}
				onChange={(s: unknown): void => onChange(s as string)}
				onSearch={(s: unknown): void => onChange(s as string)}
				aria-label={'amountToken1'}
				placeholder={'0.00000000'}
				max={toNormalizedValue(maxValue, decimals)}
				onMaxClick={(): void => {
					if (!maxValue.isZero())
						onChange(toNormalizedValue(maxValue, decimals).toString());
				}}
				withMax={withMax}
				disabled={props.disabled} />
			<p className={'text-sm md:text-base text-typo-secondary'}>{`$ ${format.amount(Number(value) * price, 2, 2)}`}</p>
		</label>
	);
}

const Input = Object.assign(InputBase, {BigNumber: InputBigNumber});
export default Input;
