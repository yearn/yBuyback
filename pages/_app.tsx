import	React, {ReactElement}	from	'react';
import	{AppProps}				from	'next/app';
import	Head					from	'next/head';
import	{DefaultSeo}			from	'next-seo';
import	Footer					from	'components/StandardFooter';
import	HeaderTitle				from	'components/HeaderTitle';
import	{WithYearn}				from	'@yearn-finance/web-lib/contexts';
import	{Header}				from	'@yearn-finance/web-lib/layouts';
import	{BuybackContextApp}		from	'contexts/useBuyback';
import	'../style.css';

function	AppHead(): ReactElement {
	return (
		<>
			<Head>
				<title>{process.env.WEBSITE_NAME}</title>
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={process.env.WEBSITE_NAME} />
				<meta name={'msapplication-TileColor'} content={'#62688F'} />
				<meta name={'theme-color'} content={'#ffffff'} />
				<meta charSet={'utf-8'} />

				<link rel={'shortcut icon'} type={'image/x-icon'} href={'/favicons/favicon.ico'} />
				<link rel={'apple-touch-icon'} sizes={'180x180'} href={'/favicons/apple-touch-icon.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicons/favicon-32x32.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicons/favicon-16x16.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'192x192'} href={'/favicons/android-chrome-192x192.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'512x512'} href={'/favicons/android-chrome-512x512.png'} />

				<meta name={'robots'} content={'index,nofollow'} />
				<meta name={'googlebot'} content={'index,nofollow'} />
				<meta charSet={'utf-8'} />
			</Head>
			<DefaultSeo
				title={process.env.WEBSITE_NAME}
				defaultTitle={process.env.WEBSITE_NAME}
				description={process.env.WEBSITE_DESCRIPTION}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: process.env.WEBSITE_URI,
					site_name: process.env.WEBSITE_NAME,
					title: process.env.WEBSITE_NAME,
					description: process.env.WEBSITE_DESCRIPTION,
					images: [
						{
							url: `${process.env.WEBSITE_URI}og.png`,
							width: 1200,
							height: 675,
							alt: 'Yearn'
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image'
				}} />
		</>
	);
}

function	AppWrapper(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	return (
		<>
			<AppHead />
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
				<p className={'text-xs text-typo-secondary'}>
					{'Data provided by '}
					<a href={'https://www.yfistats.com/'} target={'_blank'} rel={'noreferrer'} className={'text-typo-primary-variant'}>
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
		<WithYearn>
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
