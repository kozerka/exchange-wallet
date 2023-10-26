import PropTypes from 'prop-types';

function Pagination({ currentPage, totalPages, onPageChange }) {
	return (
		<div className={'flex items-center justify-center my-4'}>
			<button
				className={`${
					currentPage === 1
						? 'bg-yellow-100 cursor-not-allowed'
						: 'bg-orange-500 hover:bg-orange-600'
				} text-gray-800 px-4 py-2 rounded-l`}
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				Prev
			</button>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
				<button
					key={page}
					className={`mx-1 px-4 py-2 rounded text-gray-800 border ${
						currentPage === page ? 'bg-orange-500 text-gray-800' : 'bg-white hover:bg-yellow-100'
					}`}
					onClick={() => onPageChange(page)}
				>
					{page}
				</button>
			))}

			<button
				className={`${
					currentPage === totalPages
						? 'bg-yellow-100 cursor-not-allowed'
						: 'bg-orange-500 hover:bg-orange-600'
				} text-gray-800 px-4 py-2 rounded-r`}
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				Next
			</button>
		</div>
	);
}

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
