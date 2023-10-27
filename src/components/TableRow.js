import { Fragment } from 'react';
import PropTypes from 'prop-types';
import ActionButtons from './ActionButtons';
import ProfitLossDisplay from './ProfitLossDisplay';

const TableRow = ({ row, headersConfig, onRemove, handleRowClick, isExpanded, renderChart }) => {
	return (
		<Fragment>
			<tr className={'border-b bg-yellow-400 border-gray-400 '}>
				{headersConfig.map(header => (
					<td
						className={'px-6 py-4 font-medium whitespace-nowrap text-gray-800'}
						key={header.label}
					>
						{header.label === 'actions' ? (
							<ActionButtons
								onRemove={() => onRemove(row.id)}
								handleRowClick={() => handleRowClick(row)}
							/>
						) : ['currentRate', 'currentValue', 'profitLoss'].includes(header.label) ? (
							row.history && row.history.length ? (
								header.label === 'profitLoss' ? (
									<ProfitLossDisplay
										profitLossValue={row.history[row.history.length - 1][header.label]}
									/>
								) : (
									row.history[row.history.length - 1][header.label]
								)
							) : (
								'-'
							)
						) : (
							row[header.label]
						)}
					</td>
				))}
			</tr>
			{isExpanded && (
				<tr>
					<td colSpan={headersConfig.length} className="bg-white p-4">
						{renderChart(row)}
					</td>
				</tr>
			)}
		</Fragment>
	);
};

TableRow.propTypes = {
	row: PropTypes.object.isRequired,
	headersConfig: PropTypes.array.isRequired,
	onRemove: PropTypes.func.isRequired,
	handleRowClick: PropTypes.func.isRequired,
	isExpanded: PropTypes.bool.isRequired,
	renderChart: PropTypes.func.isRequired,
};

export default TableRow;
