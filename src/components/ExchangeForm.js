import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchExchangeRate,
	addTransactionThunk,
	removeTransactionThunk,
} from '../store/thunks/exchangeThunks';
import { headersConfig } from '../utils/headersConfig';
import { getLatestExchangeRate } from '../apis/exchangerates.api';
import Table from './Table';
import { sampleCurrencies } from '../utils/sampleCurrencies';
function ExchangeForm() {
	const dispatch = useDispatch();
	const selectedRate = useSelector(state => state.exchange.rate);
	const status = useSelector(state => state.exchange.status);

	const transactions = useSelector(state => state.exchange.transactions);

	const [currency, setCurrency] = useState('PLN');
	const [base, setBase] = useState('');
	const [amount, setAmount] = useState('');
	const [date, setDate] = useState('');
	const [rate, setRate] = useState('');
	const [currentRate, setCurrentRate] = useState(0);

	const [rateModifiedByUser, setRateModifiedByUser] = useState(false);
	useEffect(() => {
		if (base && currency) {
			getLatestExchangeRate(currency, base)
				.then(data => {
					setCurrentRate(data.rates[currency]);
				})
				.catch(error => {
					console.error('Błąd podczas pobierania currentRate:', error);
				});
		}
	}, [base, currency]);

	useEffect(() => {
		if (base && date && !rateModifiedByUser) {
			dispatch(fetchExchangeRate({ date, currency, base }))
				.then(result => {
					if (fetchExchangeRate.fulfilled.match(result)) {
						setRate(selectedRate);
					}
				})
				.catch(error => {
					console.error('Błąd podczas pobierania rate:', error);
				});
		}
	}, [base, date, currency, dispatch, selectedRate, rateModifiedByUser]);

	const handleSubmit = e => {
		e.preventDefault();

		if (!rateModifiedByUser) {
			dispatch(fetchExchangeRate({ date, currency, base })).then(result => {
				if (fetchExchangeRate.fulfilled.match(result)) {
					handleAddTransaction();
				}
			});
		} else {
			handleAddTransaction();
		}
	};

	const handleAddTransaction = () => {
		const currentValue = rate * amount;
		const profitLoss = currentRate * amount - currentValue;
		dispatch(
			addTransactionThunk({
				id: Date.now(),
				symbols: currency,
				base,
				amount,
				date,
				rate: rateModifiedByUser ? rate : selectedRate,
				currentRate,
				currentValue,
				profitLoss,
			})
		);
		setCurrency('PLN');
		setBase('');
		setAmount('');
		setDate('');
		setRate('');
		setRateModifiedByUser(false);
	};
	const handleRemoveTransaction = id => {
		dispatch(removeTransactionThunk(id));
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Currency:
						<input
							type={'radio'}
							value={'PLN'}
							checked={currency === 'PLN'}
							onChange={() => setCurrency('PLN')}
						/>{' '}
						PLN
						<input
							type={'radio'}
							value={'EUR'}
							checked={currency === 'EUR'}
							onChange={() => setCurrency('EUR')}
						/>{' '}
						EUR
						<input
							type={'radio'}
							value={'USD'}
							checked={currency === 'USD'}
							onChange={() => setCurrency('USD')}
						/>{' '}
						USD
					</label>
				</div>
				<div>
					<label>
						Base:
						<select value={base} onChange={e => setBase(e.target.value)}>
							{sampleCurrencies.map(cur => (
								<option key={cur} value={cur}>
									{cur}
								</option>
							))}
						</select>
					</label>
				</div>
				<div>
					<label>
						Amount:
						<input
							type={'number'}
							value={amount}
							onChange={e => setAmount(Number(e.target.value))}
						/>
					</label>
				</div>
				<div>
					<label>
						Date:
						<input type={'date'} value={date} onChange={e => setDate(e.target.value)} />
					</label>
				</div>
				<div>
					<label>
						Rate:
						<input
							type={'number'}
							value={rate}
							onChange={e => {
								setRate(e.target.value);
								setRateModifiedByUser(true);
							}}
						/>
					</label>
				</div>
				<div>
					<button type={'submit'}>Submit</button>
				</div>
				{status === 'loading' && <p>Loading...</p>}
			</form>
			<Table headersConfig={headersConfig} rows={transactions} onRemove={handleRemoveTransaction} />
		</>
	);
}

export default ExchangeForm;
