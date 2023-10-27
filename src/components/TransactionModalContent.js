import PropTypes from 'prop-types';
const TransactionModalContent = ({ transaction }) => {
	return (
		<div className={'text-center'}>
			<p className={'mb-4 text-xl font-bold text-red-600'}>
				Are you sure you want to remove this transaction?
			</p>
			{transaction && (
				<>
					<p className={'font-bold'}>Transaction Details:</p>
					<p>
						<span className={'font-bold'}>ID:</span> {transaction.id}
					</p>
					<p>
						<span className={'font-bold'}>Currency:</span> {transaction.symbols}
					</p>
					<p>
						<span className={'font-bold'}>Base:</span> {transaction.base}
					</p>
					<p>
						<span className={'font-bold'}>Amount:</span> {transaction.amount}
					</p>
					{transaction.history && transaction.history.length > 0 && (
						<div className={'m-6'}>
							<p className={'font-bold mt-4'}>Last History Entry:</p>
							<p>
								<span className={'font-bold'}>Current Rate:</span>{' '}
								{transaction.history[transaction.history.length - 1].currentRate}
							</p>
							<p>
								<span className={'font-bold'}>Current Value:</span>{' '}
								{transaction.history[transaction.history.length - 1].currentValue}
							</p>
							<p>
								<span className={'font-bold'}>Profit/Loss:</span>{' '}
								{transaction.history[transaction.history.length - 1].profitLoss}
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
};
TransactionModalContent.propTypes = {
	transaction: PropTypes.shape({
		id: PropTypes.number.isRequired,
		symbols: PropTypes.string.isRequired,
		base: PropTypes.string.isRequired,
		amount: PropTypes.number.isRequired,
		history: PropTypes.arrayOf(
			PropTypes.shape({
				date: PropTypes.string.isRequired,
				currentRate: PropTypes.number.isRequired,
				currentValue: PropTypes.string.isRequired,
				profitLoss: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
};

export default TransactionModalContent;
