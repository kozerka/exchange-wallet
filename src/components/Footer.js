import { BsGithub } from 'react-icons/bs';

const Footer = () => {
	const copyright = String.fromCodePoint(0x00a9);
	const currentYear = new Date().getFullYear();
	return (
		<div className={'p-3 bg-gray-800 text-white'}>
			<div className={'container mx-auto'}>
				<div className={'flex justify-center items-center'}>
					<div className={'text-center'}>
						Copyright {copyright} {currentYear} All rights reserved | This template is made with
						<a
							className={'inline-block text-decoration-none mx-2 hover:underline'}
							href={'https://github.com/kozerka'}
							target={'_blank'}
							rel={'noreferrer'}
						>
							<BsGithub className={'inline align-middle text-yellow-400'} /> kozerka
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
