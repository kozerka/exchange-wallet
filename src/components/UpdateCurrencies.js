import Button from './Button';
import { GiClick } from 'react-icons/gi';
import { getPolishDateTime } from '../utils/getPolishDateTime';
import PropTypes from 'prop-types';

const UpdateCurrencies = ({ transactions, handleUpdateHistory, lastUpdatedDate }) => {
	return (
		<div className={'m-4'}>
			<Button
				className={
					'w-full bg-yellow-400 hover:bg-orange-500 text-black px-4 py-2 rounded block text-lg'
				}
				onClick={() => transactions.forEach(t => handleUpdateHistory(t.id))}
			>
				<span>Current data for the date: </span>
				<span className={'font-bold'}>
					{lastUpdatedDate ? getPolishDateTime(new Date(lastUpdatedDate)) : 'not available'}.
				</span>
				<br />
				<span className={'uppercase mx-2 my-1'}>Click to update.</span>
				<GiClick className={'inline-block ml-2'} />
			</Button>
		</div>
	);
};
UpdateCurrencies.propTypes = {
	transactions: PropTypes.array,
	handleUpdateHistory: PropTypes.func,
	lastUpdatedDate: PropTypes.string,
};

export default UpdateCurrencies;
