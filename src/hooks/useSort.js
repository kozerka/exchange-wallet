import { useState } from 'react';

const useSort = (data, config) => {
	const [sortOrder, setSortOrder] = useState(null);
	const [sortBy, setSortBy] = useState(null);

	const setSortColumn = label => {
		if (sortBy && label !== sortBy) {
			setSortOrder('asc');
			setSortBy(label);
			return;
		}
		if (sortOrder === null) {
			setSortOrder('asc');
			setSortBy(label);
		} else if (sortOrder === 'asc') {
			setSortOrder('desc');
			setSortBy(label);
		} else if (sortOrder === 'desc') {
			setSortOrder(null);
			setSortBy(null);
		}
	};

	let sortedData = [...data];
	if (sortOrder && sortBy) {
		const { sortValue } = config.find(column => column.label === sortBy);
		sortedData = [...data].sort((a, b) => {
			const aValue = sortValue(a) || '';
			const bValue = sortValue(b) || '';
			const reverseOrder = sortOrder === 'asc' ? 1 : -1;
			const isDatePattern = /^\d{4}-\d{2}-\d{2}$/;
			if (sortBy === 'profitLoss') {
				if (aValue === 0 && bValue !== 0) return reverseOrder;
				if (aValue !== 0 && bValue === 0) return -reverseOrder;
				return (aValue - bValue) * reverseOrder;
			}
			if (isDatePattern.test(aValue) && isDatePattern.test(bValue)) {
				return (new Date(aValue).getTime() - new Date(bValue).getTime()) * reverseOrder;
			}
			if (typeof aValue === 'number' && typeof bValue === 'number') {
				return (aValue - bValue) * reverseOrder;
			}
			if (typeof aValue === 'string' && typeof bValue === 'string') {
				return aValue.localeCompare(bValue) * reverseOrder;
			}
			return 0;
		});
	}

	return {
		sortOrder,
		sortBy,
		setSortColumn,
		sortedData,
	};
};

export default useSort;
