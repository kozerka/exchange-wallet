import PropTypes from 'prop-types';
import { TiArrowSortedUp, TiArrowSortedDown, TiArrowUnsorted } from 'react-icons/ti';

const TableHeader = ({ headersConfig, onSort, sortBy, sortOrder }) => {
	return (
		<thead className={'text-sm text-white uppercase bg-gray-700 '}>
			<tr>
				{headersConfig.map(header => (
					<th
						scope={'col'}
						className={'px-2 py-3'}
						key={header.label}
						onClick={() => header.isSortable && onSort(header.label)}
						style={{ cursor: header.isSortable ? 'pointer' : 'default' }}
					>
						<div className={'flex items-center'}>
							{header.isSortable && (
								<>
									{header.label !== sortBy && <TiArrowUnsorted size={'2rem'} />}
									{header.label === sortBy && sortOrder === 'asc' && (
										<TiArrowSortedUp size={'2rem'} />
									)}
									{header.label === sortBy && sortOrder === 'desc' && (
										<TiArrowSortedDown size={'2rem'} />
									)}
								</>
							)}
							{header.title}
						</div>
					</th>
				))}
			</tr>
		</thead>
	);
};
TableHeader.propTypes = {
	headersConfig: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
			isSortable: PropTypes.bool,
		})
	).isRequired,
	onSort: PropTypes.func.isRequired,
	sortBy: PropTypes.string,
	sortOrder: PropTypes.string,
};

export default TableHeader;
