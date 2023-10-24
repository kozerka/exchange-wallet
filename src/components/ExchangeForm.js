import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchExchangeRate,
	addTransactionThunk,
	removeTransactionThunk,
} from '../store/thunks/exchangeThunks';
import { headersConfig } from '../utils/headersConfig';
import Table from './Table';

import { formFields } from '../utils/formFields';
import {
	resetForm,
	setCurrency,
	setBase,
	setAmount,
	setDate,
	setRate,
} from '../store/slices/exchangeSlice';
import Button from './Button';
import useCurrentRate from '../hooks/useCurrentRate';

function ExchangeForm() {
	const dispatch = useDispatch();
	const selectedRate = useSelector(state => state.exchange.rate);
	const status = useSelector(state => state.exchange.status);
	const transactions = useSelector(state => state.exchange.transactions);
	const currency = useSelector(state => state.exchange.currency);
	const base = useSelector(state => state.exchange.base);
	const amount = useSelector(state => state.exchange.amount);
	const date = useSelector(state => state.exchange.date);
	const rate = useSelector(state => state.exchange.rate);
	const rateModifiedByUser = useSelector(state => state.exchange.rateModifiedByUser);
	const [errors, setErrors] = useState({});
	const currentRate = useCurrentRate(base, currency);

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

	useEffect(() => {
		if (rate && errors.rate) {
			setErrors(prevErrors => {
				const newErrors = { ...prevErrors };
				delete newErrors.rate;
				return newErrors;
			});
		}
	}, [rate, errors]);

	const handleSubmit = e => {
		e.preventDefault();

		if (validateAllFields()) {
			if (!rateModifiedByUser) {
				dispatch(fetchExchangeRate({ date, currency, base })).then(result => {
					if (fetchExchangeRate.fulfilled.match(result)) {
						handleAddTransaction();
					}
				});
			} else {
				handleAddTransaction();
			}
		}
	};

	const handleInputChange = (name, value) => {
		switch (name) {
			case 'currency':
				dispatch(setCurrency(value));
				break;
			case 'base':
				dispatch(setBase(value));
				break;
			case 'amount':
				dispatch(setAmount(value));
				break;
			case 'date':
				dispatch(setDate(value));
				break;
			case 'rate':
				dispatch(setRate(value));
				break;
			default:
				break;
		}

		// walidacja
		const field = formFields.find(f => f.name === name);
		if (field && field.validate) {
			const errorMessage = field.validate(value);
			setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
		}
	};
	const validateAllFields = () => {
		const errorsFound = {};
		formFields.forEach(field => {
			const errorMessage = field.validate && field.validate(getFieldValue(field.name));
			if (errorMessage) {
				errorsFound[field.name] = errorMessage;
			}
		});
		setErrors(errorsFound);
		return Object.keys(errorsFound).length === 0; // zwraca true, jeśli nie znaleziono błędów
	};

	const getFieldValue = fieldName => {
		switch (fieldName) {
			case 'currency':
				return currency;
			case 'base':
				return base;
			case 'amount':
				return amount;
			case 'date':
				return date;
			case 'rate':
				return rate;
			default:
				return '';
		}
	};
	const calculatePercentageChange = (purchaseValue, currentValue) => {
		if (purchaseValue === 0) return 0;
		return ((currentValue - purchaseValue) / purchaseValue) * 100;
	};
	const handleAddTransaction = () => {
		const roundedCurrentRate = Number(currentRate.toFixed(2));
		const currentValue = (rate * amount).toFixed(2);
		const purchaseValue = (roundedCurrentRate * amount).toFixed(2);
		const profitLossValue = Number((roundedCurrentRate * amount - currentValue).toFixed(2));
		const percentageChange = calculatePercentageChange(currentValue, purchaseValue).toFixed(2);
		const profitLossDisplayValue = `${profitLossValue} (${percentageChange}%)`;
		dispatch(
			addTransactionThunk({
				id: Date.now(),
				symbols: currency,
				base,
				amount,
				date,
				rate: rateModifiedByUser ? rate : selectedRate.toFixed(2),
				currentRate: roundedCurrentRate,
				currentValue,
				profitLoss: profitLossDisplayValue,
			})
		);
		dispatch(resetForm());
	};

	const handleRemoveTransaction = id => {
		dispatch(removeTransactionThunk(id));
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				{formFields.map(field => (
					<div key={field.name}>
						<label>
							{field.label}:
							{field.type === 'radio' &&
								field.options.map(option => (
									<span key={option}>
										<input
											type={'radio'}
											name={field.name}
											value={option}
											checked={currency === option} // Tylko dla 'currency'
											onChange={e => handleInputChange(field.name, e.target.value)}
										/>{' '}
										{option}
									</span>
								))}
							{field.type === 'select' && (
								<select
									name={field.name}
									value={base || ''} // Tylko dla 'base'
									onChange={e => handleInputChange(field.name, e.target.value)}
								>
									{field.options.map(option => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							)}
							{field.type === 'number' && field.name === 'amount' && (
								<input
									type={'number'}
									name={field.name}
									value={amount || ''}
									onChange={e => handleInputChange(field.name, e.target.value)}
								/>
							)}
							{field.type === 'number' && field.name === 'rate' && (
								<input
									type={'number'}
									name={field.name}
									value={rate || ''}
									onChange={e => handleInputChange(field.name, e.target.value)}
								/>
							)}
							{field.type === 'date' && (
								<input
									type={'date'}
									name={field.name}
									value={date || ''}
									onChange={e => handleInputChange(field.name, e.target.value)}
								/>
							)}
						</label>
						{errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]}</p>}
					</div>
				))}

				<div>
					{status !== 'loading' ? (
						<Button primary type={'submit'}>
							Submit
						</Button>
					) : (
						<Button loading={true} disabled>
							{' '}
							Loading...{' '}
						</Button>
					)}
				</div>
			</form>
			<Table headersConfig={headersConfig} rows={transactions} onRemove={handleRemoveTransaction} />
		</>
	);
}

export default ExchangeForm;
