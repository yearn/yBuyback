import	React, {ReactElement}		from	'react';
import	Link						from	'next/link';
import	{SwitchTheme}				from	'@yearn-finance/web-lib/components';
import	{useUI}						from	'@yearn-finance/web-lib/contexts';
import	{
	SocialTwitter,
	SocialGithub,
	SocialDiscord,
	SocialMedium
}									from	'@yearn-finance/web-lib/icons';
import	meta						from	'public/manifest.json';


function	Footer({children}: {children: ReactElement}): ReactElement {
	const	{theme, switchTheme} = useUI();

	return (
		<footer className={'hidden flex-row items-center py-8 mx-auto mt-auto w-full max-w-6xl md:flex'}>
			<Link href={'/disclaimer'}>
				<p className={'pr-6 text-xs hover:underline transition-colors cursor-pointer text-neutral-500 hover:text-accent-500'}>{'Disclaimer'}</p>
			</Link>
			<a href={'https://docs.yearn.finance'} target={'_blank'} className={'pr-6 text-xs hover:underline transition-colors text-neutral-500 hover:text-accent-500'} rel={'noreferrer'}>
				{'Documentation'}
			</a>
			<a href={'https://gov.yearn.finance/'} target={'_blank'} className={'pr-6 text-xs hover:underline transition-colors text-neutral-500 hover:text-accent-500'} rel={'noreferrer'}>
				{'Governance forum'}
			</a>
			<a href={'https://github.com/yearn/yearn-security/blob/master/SECURITY.md'} target={'_blank'} className={'pr-6 text-xs hover:underline transition-colors text-neutral-500 hover:text-accent-500'} rel={'noreferrer'}>
				{'Report a vulnerability'}
			</a>

			{children}

			<div className={'px-2 ml-auto transition-colors cursor-pointer text-neutral-500 hover:text-accent-500'}>
				<a href={'https://twitter.com/iearnfinance'} target={'_blank'} rel={'noreferrer'}>
					<SocialTwitter className={'w-5 h-5'} />
				</a>
			</div>
			<div className={'px-2 transition-colors cursor-pointer text-neutral-500 hover:text-accent-500'}>
				<a href={meta.github} target={'_blank'} rel={'noreferrer'}>
					<SocialGithub className={'w-5 h-5'} />
				</a>
			</div>
			<div className={'px-2 transition-colors cursor-pointer text-neutral-500 hover:text-accent-500'}>
				<a href={'https://discord.yearn.finance/'} target={'_blank'} rel={'noreferrer'}>
					<SocialDiscord className={'w-5 h-5'} />
				</a>
			</div>
			<div className={'px-2 transition-colors cursor-pointer text-neutral-500 hover:text-accent-500'}>
				<a href={'https://medium.com/iearn'} target={'_blank'} rel={'noreferrer'}>
					<SocialMedium className={'w-5 h-5'} />
				</a>
			</div>
			<div className={'pl-3'}>
				<SwitchTheme theme={theme} switchTheme={switchTheme} />
			</div>
		</footer>
	);
}

export default Footer;