import useSort from '../hooks/useSort';
import { TiArrowUnsorted, TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

import PropTypes from 'prop-types';

function Table({ headersConfig, rows, onRemove }) {
	const { sortOrder, sortBy, setSortColumn, sortedData } = useSort(rows, headersConfig);

	return (
		<div className={'relative overflow-x-auto shadow-md sm:rounded-lg m-4'}>
			<table className={'w-full text-sm text-center text-gray-400'}>
				<thead className="text-sm text-white uppercase bg-gray-700 ">
					<tr>
						{headersConfig.map(header => (
							<th
								scope="col"
								className="px-6 py-3"
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
						<tr className=" border-b bg-yellow-400 border-gray-400" key={rowIndex}>
							{headersConfig.map(header => (
								<td
									scope="row"
									className="px-6 py-4 font-medium  whitespace-nowrap text-gray-800"
									key={header.label}
								>
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
		</div>
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
