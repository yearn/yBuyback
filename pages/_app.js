import	React						from	'react';
import	Head						from	'next/head';
import	{DefaultSeo}				from	'next-seo';
import	{ethers}					from	'ethers';
import	{Web3ReactProvider}			from	'@web3-react/core';
import	{BalancesContextApp}		from	'contexts/useBalances';
import	{UIContextApp}				from	'contexts/useUI';
import	{PricesContextApp}			from	'contexts/usePrices';
import	{LocalizationContextApp}	from 	'contexts/useLocalization';
import	{Web3ContextApp}			from	'contexts/useWeb3';
import	Header						from	'components/StandardHeader';
import	Footer						from	'components/StandardFooter';

import	'style/Default.css';

function	AppWrapper(props) {
	const	WEBSITE_URI = process.env.WEBSITE_URI;
	const	{Component, pageProps, router} = props;

	return (
		<>
			<Head>
				<title>{process.env.WEBSITE_NAME}</title>
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={process.env.WEBSITE_NAME} />

				<link rel={'apple-touch-icon'} sizes={'57x57'} href={'/favicons/apple-icon-57x57.png'} />
				<link rel={'apple-touch-icon'} sizes={'60x60'} href={'/favicons/apple-icon-60x60.png'} />
				<link rel={'apple-touch-icon'} sizes={'72x72'} href={'/favicons/apple-icon-72x72.png'} />
				<link rel={'apple-touch-icon'} sizes={'76x76'} href={'/favicons/apple-icon-76x76.png'} />
				<link rel={'apple-touch-icon'} sizes={'114x114'} href={'/favicons/apple-icon-114x114.png'} />
				<link rel={'apple-touch-icon'} sizes={'120x120'} href={'/favicons/apple-icon-120x120.png'} />
				<link rel={'apple-touch-icon'} sizes={'144x144'} href={'/favicons/apple-icon-144x144.png'} />
				<link rel={'apple-touch-icon'} sizes={'152x152'} href={'/favicons/apple-icon-152x152.png'} />
				<link rel={'apple-touch-icon'} sizes={'180x180'} href={'/favicons/apple-icon-180x180.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'192x192'}  href={'/favicons/android-icon-192x192.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicons/favicon-32x32.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'96x96'} href={'/favicons/favicon-96x96.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicons/favicon-16x16.png'} />
				<link rel={'manifest'} href={'/favicons/manifest.json'} />
				<meta name={'msapplication-TileColor'} content={'#ffffff'} />
				<meta name={'msapplication-TileImage'} content={'/ms-icon-144x144.png'} />
				<meta name={'theme-color'} content={'#ffffff'} />

				<link rel={'preconnect'} href={'https://fonts.googleapis.com'} />
				<link rel={'preconnect'} href={'https://fonts.gstatic.com'} crossOrigin={'true'} />
				<link href={'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'} rel={'stylesheet'} />

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
					url: WEBSITE_URI,
					site_name: process.env.WEBSITE_NAME,
					title: process.env.WEBSITE_NAME,
					description: process.env.WEBSITE_DESCRIPTION,
					images: [
						{
							url: `${WEBSITE_URI}og.png`,
							width: 1200,
							height: 675,
							alt: 'Yearn',
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image',
				}} />
			<Header />
			<main id={'app'} className={'flex relative flex-col mx-auto mt-14 mb-0 max-w-6xl md:flex-row md:mt-28 md:mb-6'}>
				<Component
					key={router.route}
					element={props.element}
					router={props.router}
					{...pageProps} />
			</main>
			<Footer>
				<p className={'pr-6 ml-auto text-gray-blue-1'}>
					{'Data provided by '}
					<a href={'https://www.yfistats.com/'} target={'_blank'} rel={'noreferrer'} className={'text-yearn-blue'}>
						{'yfistats'}
					</a>
				</p>
			</Footer>
		</>
	);
}

const getLibrary = (provider) => {
	return new ethers.providers.Web3Provider(provider, 'any');
};

function	MyApp(props) {
	const	{Component, pageProps} = props;
	
	return (
		<UIContextApp>
			<Web3ReactProvider getLibrary={getLibrary}>
				<Web3ContextApp>
					<BalancesContextApp>
						<PricesContextApp>
							<LocalizationContextApp router={props.router}>
								<AppWrapper
									Component={Component}
									pageProps={pageProps}
									element={props.element}
									router={props.router} />
							</LocalizationContextApp>
						</PricesContextApp>
					</BalancesContextApp>
				</Web3ContextApp>
			</Web3ReactProvider>
		</UIContextApp>
	);
}

export default MyApp;
