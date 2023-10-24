import useSort from '../hooks/useSort';
import { TiArrowUnsorted, TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import PropTypes from 'prop-types';

function Table({ headersConfig, rows, onRemove }) {
	const { sortOrder, sortBy, setSortColumn, sortedData } = useSort(rows, headersConfig);

	return (
		<table>
			<thead>
				<tr>
					{headersConfig.map(header => (
						<th
							key={header.label}
							onClick={() => header.isSortable && setSortColumn(header.label)}
							style={{ cursor: header.isSortable ? 'pointer' : 'default' }}
						>
							<div className={'flex items-center'}>
								{header.isSortable && (
									<>
										{header.label !== sortBy && <TiArrowUnsorted />}
										{header.label === sortBy && sortOrder === 'asc' && <TiArrowSortedUp />}
										{header.label === sortBy && sortOrder === 'desc' && <TiArrowSortedDown />}
									</>
								)}
								{header.title}
							</div>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{sortedData.map((row, rowIndex) => (
					<tr key={rowIndex}>
						{headersConfig.map(header => (
							<td key={header.label}>
								{header.label === 'actions' ? (
									<button onClick={() => onRemove(row.id)}>delete</button>
								) : (
									row[header.label]
								)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
Table.propTypes = {
	headersConfig: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			isSortable: PropTypes.bool,
		})
	).isRequired,
	rows: PropTypes.arrayOf(PropTypes.object).isRequired,
	onRemove: PropTypes.func.isRequired,
};

export default Table;
