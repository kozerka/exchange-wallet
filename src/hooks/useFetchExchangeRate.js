import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRate } from '../store/slices/exchangeSlice';
import { fetchExchangeRate } from '../store/thunks/exchangeThunks';

export const useFetchExchangeRate = (base, date, currency, rateModifiedByUser) => {
	const dispatch = useDispatch();
	const selectedRate = useSelector(state => state.exchange.rate);

	useEffect(() => {
		if (base && date && !rateModifiedByUser) {
			dispatch(fetchExchangeRate({ date, currency, base }))
				.then(result => {
					if (fetchExchangeRate.fulfilled.match(result)) {
						dispatch(setRate(selectedRate));
					}
				})
				.catch(error => {
					console.error('Błąd podczas pobierania rate:', error);
				});
		}
	}, [base, date, currency, dispatch, selectedRate, rateModifiedByUser]);

	return { selectedRate };
};
