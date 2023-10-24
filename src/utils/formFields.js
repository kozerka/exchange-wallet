import { sampleCurrencies } from './sampleCurrencies';
export const formFields = [
	{
		type: 'radio',
		name: 'currency',
		label: 'Currency',
		options: ['PLN', 'EUR', 'USD'],
		validate: value => (!value ? 'Currency is required!' : null),
	},
	{
		type: 'select',
		name: 'base',
		label: 'Base',
		options: sampleCurrencies,
		validate: value => (!value ? 'Base is required!' : null),
	},
	{
		type: 'number',
		name: 'amount',
		label: 'Amount',
		validate: value => (!value || value <= 0 ? 'Amount must be greater than 0!' : null),
	},
	{
		type: 'date',
		name: 'date',
		label: 'Date',
		validate: value => {
			if (!value) return 'Date cannot be empty!';
			if (new Date(value) > new Date()) return 'Date cannot be in the future!';
			return null;
		},
	},
	{
		type: 'number',
		name: 'rate',
		label: 'Rate',
		validate: value => {
			if (!value) {
				return 'Rate must be provided!';
			}
			if (value <= 0) {
				return 'Rate must be greater than zero!';
			}
			return null;
		},
	},
];
