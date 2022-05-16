import	React, {ReactElement, ReactNode}	from	'react';
import	IconLoader							from	'components/icons/IconLoader';

type 		TInput = {
	children: ReactNode,
	isBusy?: boolean,
	isDisabled?: boolean,
} & React.ComponentPropsWithoutRef<'button'>
function	Button({
	children,
	isBusy = false,
	isDisabled = false,
	...props
}: TInput): ReactElement {
	return (
		<button
			className={'button-primary'}
			aria-busy={isBusy}
			disabled={isDisabled}
			{...props}>
			{children}
			{isBusy ? <div className={'flex absolute inset-0 justify-center items-center'}>
				<IconLoader className={'w-6 h-6 text-white animate-spin'} />
			</div> : null}
		</button>
	);
}

export default Button;
