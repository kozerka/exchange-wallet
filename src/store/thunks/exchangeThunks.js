import { createAsyncThunk } from '@reduxjs/toolkit';
import { getExchangeRateByDate } from '../../apis/exchangerates.api';

export const fetchExchangeRate = createAsyncThunk(
	'exchange/fetchExchangeRate',
	async ({ date, currency, base }) => {
		const response = await getExchangeRateByDate(date, currency, base);
		return response.rates[currency];
	}
);

export const addTransactionThunk = createAsyncThunk(
	'exchange/addTransaction',
	async (transaction, { getState }) => {
		return transaction;
	}
);

export const removeTransactionThunk = createAsyncThunk(
	'exchange/removeTransaction',
	async (id, { getState }) => {
		return id;
	}
);
