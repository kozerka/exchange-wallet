import Table from './Table';
import Pagination from './Pagination';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useSort from '../hooks/useSort';

const TableContainer = ({ headersConfig, rows, onRemove }) => {
	const { sortOrder, sortBy, setSortColumn, sortedData } = useSort(rows, headersConfig);
	const rowsPerPage = 8;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(rows.length / rowsPerPage);
	const indexOfLastRow = currentPage * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;

	return (
		<div>
			<Table
				headersConfig={headersConfig}
				rows={sortedData.slice(indexOfFirstRow, indexOfLastRow)}
				onRemove={onRemove}
				onSort={setSortColumn}
				sortBy={sortBy}
				sortOrder={sortOrder}
			/>
			{totalPages > 1 && (
				<>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={page => setCurrentPage(page)}
					/>
					<div className={'text-center mt-4 mb-4'}>
						Displaying {indexOfFirstRow + 1} - {indexOfLastRow} of {rows.length} transactions
					</div>
				</>
			)}
		</div>
	);
};

TableContainer.propTypes = {
	headersConfig: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired,
	onRemove: PropTypes.func,
	openModal: PropTypes.func,
};

export default TableContainer;
