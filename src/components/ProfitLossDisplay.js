import PropTypes from 'prop-types';

const ProfitLossDisplay = ({ profitLossValue }) => {
	const percentagePart = profitLossValue.match(/\((.*?)%\)/);
	const percentageValue = percentagePart ? parseFloat(percentagePart[1]) : 0;

	return (
		<span
			className={`inline-block px-2 py-1 text-sm font-medium rounded ${
				percentageValue < 0
					? 'bg-red-500 text-white'
					: percentageValue > 0
					? 'bg-green-500 text-white'
					: 'bg-blue-500 text-white'
			}`}
		>
			{profitLossValue}
		</span>
	);
};

ProfitLossDisplay.propTypes = {
	profitLossValue: PropTypes.string.isRequired,
};

export default ProfitLossDisplay;
