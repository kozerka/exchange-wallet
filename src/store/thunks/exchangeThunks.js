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
export const updateTransactionHistoryThunk = createAsyncThunk(
	'exchange/updateTransactionHistory',
	async (transactionId, { getState, dispatch }) => {
		const state = getState();
		const transaction = state.exchange.transactions.find(t => t.id === transactionId);
		if (!transaction) {
			throw new Error('Transaction not found');
		}

		const currentRateResponse = await dispatch(
			fetchExchangeRate({
				date: new Date().toISOString().split('T')[0],
				currency: transaction.symbols,
				base: transaction.base,
			})
		);

		const currentRate = parseFloat(currentRateResponse.payload.toFixed(2));
		const currentValue = (transaction.amount * currentRate).toFixed(2);
		const profitLoss = (currentValue - transaction.amount * transaction.rate).toFixed(2);
		const profitLossPercentage = (
			(profitLoss / (transaction.amount * transaction.rate)) *
			100
		).toFixed(2);

		const newHistoryEntry = {
			date: new Date().toISOString(),
			currentRate,
			currentValue,
			profitLoss: `${profitLoss} (${profitLossPercentage}%)`,
		};

		return { id: transactionId, history: newHistoryEntry };
	}
);
