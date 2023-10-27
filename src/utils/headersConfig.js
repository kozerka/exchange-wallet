export const headersConfig = [
	{
		label: 'symbols',
		title: (
			<>
				Purchase
				<br />
				Currency
			</>
		),
		sortValue: item => item.symbols,
		isSortable: true,
	},
	{
		label: 'base',
		title: (
			<>
				Owned
				<br />
				Currency
			</>
		),
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
		title: (
			<>
				Purchase
				<br />
				Rate
			</>
		),
		sortValue: item => item.rate,
		isSortable: true,
	},
	{
		label: 'currentRate',
		title: (
			<>
				Current
				<br />
				Rate
			</>
		),
		sortValue: item => item.currentRate,
		isSortable: false,
	},
	{
		label: 'currentValue',
		title: 'Current Value',
		sortValue: item => {
			const latestHistory =
				item.history && item.history.length ? item.history[item.history.length - 1] : null;
			return latestHistory ? parseFloat(latestHistory.currentValue) : 0;
		},
		isSortable: true,
	},
	{
		label: 'profitLoss',
		title: 'Profit/Loss',
		sortValue: item => {
			const latestHistory =
				item.history && item.history.length ? item.history[item.history.length - 1] : null;
			const profitLossValue = latestHistory ? latestHistory.profitLoss : '';
			const percentRegex = /\((-?\d+(\.\d+)?)%\)/;
			const percentMatch = profitLossValue.match(percentRegex);
			return percentMatch ? parseFloat(percentMatch[1]) : 0;
		},
		isSortable: true,
	},
	{ label: 'actions', title: 'Actions', isSortable: false },
];
