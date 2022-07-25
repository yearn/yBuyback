import	React, {ReactElement}	from	'react';
import	{AppProps}				from	'next/app';
import	Meta					from	'components/Meta';
import	Footer					from	'components/StandardFooter';
import	HeaderTitle				from	'components/HeaderTitle';
import	{WithYearn}				from	'@yearn-finance/web-lib/contexts';
import	{Header}				from	'@yearn-finance/web-lib/layouts';
import	{BuybackContextApp}		from	'contexts/useBuyback';
import	'../style.css';

function	AppWrapper(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	return (
		<>
			<Meta />
			<div className={'mx-auto w-full max-w-6xl'}>
				<Header shouldUseWallets={true}>
					<HeaderTitle />
				</Header>
			</div>
			<main
				id={'app'}
				className={'flex flex-col col-span-12 mx-auto w-full max-w-6xl min-h-[100vh] transition-colors'}>
				<Component
					key={router.route}
					router={props.router}
					{...pageProps} />
			</main>
			<Footer>
				<p className={'text-xs text-neutral-500'}>
					{'Data provided by '}
					<a href={'https://www.yfistats.com/'} target={'_blank'} rel={'noreferrer'} className={'text-accent-600'}>
						{'yfistats'}
					</a>
				</p>
			</Footer>
		</>
	);
}


function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps} = props;

	return (
		<WithYearn options={{
			ui: {
				shouldUseThemes: true
			}
		}}>
			<BuybackContextApp>
				<AppWrapper
					Component={Component}
					pageProps={pageProps}
					router={props.router} />
			</BuybackContextApp>
		</WithYearn>
	);
}

export default MyApp;
