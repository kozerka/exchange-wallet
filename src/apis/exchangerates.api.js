const { REACT_APP_API_URL: API_URL, REACT_APP_API_KEY: API_KEY } = process.env;

export const getExchangeRateByDate = async (date, symbols, base) => {
	try {
		const response = await fetch(`${API_URL}/${date}?symbols=${symbols}&base=${base}`, {
			headers: {
				apikey: API_KEY,
			},
		});
		return await response.json();
	} catch (error) {
		console.error('Error fetching exchange rate by date:', error);
		throw error;
	}
};

export const getLatestExchangeRate = async (symbols, base) => {
	try {
		const response = await fetch(`${API_URL}/latest?symbols=${symbols}&base=${base}`, {
			headers: {
				apikey: API_KEY,
			},
		});
		return await response.json();
	} catch (error) {
		console.error('Error fetching latest exchange rate:', error);
		throw error;
	}
};
