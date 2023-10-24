// exchangeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
	fetchExchangeRate,
	addTransactionThunk,
	removeTransactionThunk,
} from '../thunks/exchangeThunks';

const initialState = {
	transactions: [],
	status: 'idle',
	error: null,
	currency: 'PLN',
	base: '',
	amount: '',
	date: '',
	rate: '',
	currentRate: 0,
	rateModifiedByUser: false,
};

const exchangeSlice = createSlice({
	name: 'exchange',
	initialState,
	reducers: {
		setCurrency: (state, action) => {
			state.currency = action.payload;
		},
		setBase: (state, action) => {
			state.base = action.payload;
		},
		setAmount: (state, action) => {
			state.amount = action.payload;
		},
		setDate: (state, action) => {
			state.date = action.payload;
		},
		setRate: (state, action) => {
			state.rate = action.payload;
			state.rateModifiedByUser = true;
		},
		setRateModifiedByUser: (state, action) => {
			state.rateModifiedByUser = action.payload;
		},
		resetForm: state => {
			state.currency = 'PLN';
			state.base = '';
			state.amount = '';
			state.date = '';
			state.rate = '';
			state.rateModifiedByUser = false;
		},
	},

	extraReducers: builder => {
		builder
			.addCase(fetchExchangeRate.pending, state => {
				state.status = 'loading';
			})
			.addCase(fetchExchangeRate.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.rate = action.payload;
			})
			.addCase(fetchExchangeRate.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(addTransactionThunk.fulfilled, (state, action) => {
				state.transactions.push(action.payload);
			})
			.addCase(removeTransactionThunk.fulfilled, (state, action) => {
				state.transactions = state.transactions.filter(
					transaction => transaction.id !== action.payload
				);
			});
	},
});

export const {
	setCurrency,
	setBase,
	setAmount,
	setDate,
	setRate,
	resetForm,
	setRateModifiedByUser,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
