import { useState } from 'react';
import PropTypes from 'prop-types';

import TableHeader from './TableHeader';
import TableRow from './TableRow';
import RateChart from './RateChart';

const Table = ({ headersConfig, rows, onSort, onRemove, sortBy, sortOrder }) => {
	const [expandedRow, setExpandedRow] = useState(null);

	const handleRowClick = rowIndex => {
		if (expandedRow === rowIndex) {
			setExpandedRow(null);
		} else {
			setExpandedRow(rowIndex);
		}
	};

	const renderChart = row => <RateChart row={row} />;

	return (
		<div className={'relative overflow-x-auto shadow-md sm:rounded-lg m-4'}>
			<table className={'w-full my-table text-sm text-center text-gray-400'}>
				<TableHeader
					headersConfig={headersConfig}
					onSort={onSort}
					sortBy={sortBy}
					sortOrder={sortOrder}
				/>
				<tbody>
					{rows.map((row, rowIndex) => (
						<TableRow
							key={rowIndex}
							row={row}
							headersConfig={headersConfig}
							onRemove={onRemove}
							handleRowClick={() => handleRowClick(rowIndex)}
							isExpanded={expandedRow === rowIndex}
							renderChart={renderChart}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

Table.propTypes = {
	headersConfig: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
			isSortable: PropTypes.bool,
		})
	).isRequired,
	rows: PropTypes.arrayOf(PropTypes.object).isRequired,
	onRemove: PropTypes.func,
	onSort: PropTypes.func.isRequired,
	sortBy: PropTypes.string,
	sortOrder: PropTypes.string,
};

export default Table;
