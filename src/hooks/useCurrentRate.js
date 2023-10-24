import { useState, useEffect } from 'react';
import { getLatestExchangeRate } from '../apis/exchangerates.api';
function useCurrentRate(base, currency) {
	const [currentRate, setCurrentRate] = useState(0);
	const currentDate = new Date().toLocaleDateString();

	useEffect(() => {
		if (base && currency) {
			getLatestExchangeRate(currency, base)
				.then(data => {
					setCurrentRate(data.rates[currency]);
				})
				.catch(error => {
					console.error('Error while fetching currentRate:', error);
				});
		}
	}, [currentDate, base, currency]);

	return currentRate;
}

export default useCurrentRate;
