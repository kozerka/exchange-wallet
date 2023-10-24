import { createAsyncThunk } from '@reduxjs/toolkit';
import { getExchangeRateByDate } from '../../apis/exchangerates.api';

function saveToLocalStorage(state) {
	try {
		const serialisedState = JSON.stringify(state);
		localStorage.setItem('persistantState', serialisedState);
	} catch (e) {
		console.warn(e);
	}
}

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
		saveToLocalStorage(getState());
		return transaction;
	}
);

export const removeTransactionThunk = createAsyncThunk(
	'exchange/removeTransaction',
	async (id, { getState }) => {
		saveToLocalStorage(getState());
		return id;
	}
);
