import { GiWallet } from 'react-icons/gi';

const Header = () => {
	return (
		<div className={'h-1/10 bg-gray-800 flex items-center justify-center text-white p-4 mb-8'}>
			<GiWallet className={'mr-4 h-8 w-8 text-white'} />
			<span className={'text-2xl font-semibold'}>
				My Currency <span className={'text-yellow-400'}>Wallet</span>
			</span>
		</div>
	);
};

export default Header;
