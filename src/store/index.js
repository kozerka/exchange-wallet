import { configureStore } from '@reduxjs/toolkit';
import exchangeReducer from './slices/exchangeSlice';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
const store = configureStore({
	reducer: {
		exchange: exchangeReducer,
	},
	preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
