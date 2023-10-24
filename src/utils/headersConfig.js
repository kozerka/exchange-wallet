export const headersConfig = [
	{
		label: 'symbols',
		title: 'Purchase Currency',
		sortValue: item => item.symbols,
		isSortable: true,
	},
	{
		label: 'base',
		title: 'Owned Currency',
		sortValue: item => item.base,
		isSortable: true,
	},
	{
		label: 'amount',
		title: 'Amount',
		sortValue: item => item.amount,
		isSortable: true,
	},
	{
		label: 'date',
		title: 'Purchase Date',
		sortValue: item => item.date,
		isSortable: true,
	},
	{
		label: 'rate',
		title: 'Purchase Price',
		sortValue: item => item.rate,
		isSortable: true,
	},
	{
		label: 'currentRate',
		title: 'Current Rate',
		sortValue: item => item.currentRate,
		isSortable: false,
	},
	{
		label: 'currentValue',
		title: 'Current Value',
		sortValue: item => item.currentValue,
		isSortable: true,
	},
	{
		label: 'profitLoss',
		title: 'Profit/Loss',
		sortValue: item => item.profitLoss,
		isSortable: true,
	},
	{ label: 'actions', title: 'Actions', isSortable: false },
];
