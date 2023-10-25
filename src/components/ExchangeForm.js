import { useEffect } from 'react';
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
import FormField from './FormField';
import useCurrentRate from '../hooks/useCurrentRate';
import useFormValidation from '../hooks/useFormValidation';

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
	const currentRate = useCurrentRate(base, currency);
	const { handleInputChange, validateAllFields, getFieldValue, errors, setErrors } =
		useFormValidation(formFields, {
			currency,
			base,
			amount,
			date,
			rate,
		});
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
	}, [rate, errors, setErrors]);

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

	const handleInputChangeCustom = (name, value) => {
		handleInputChange(name, value, (fieldName, fieldValue) => {
			switch (fieldName) {
				case 'currency':
					dispatch(setCurrency(fieldValue));
					break;
				case 'base':
					dispatch(setBase(fieldValue));
					break;
				case 'amount':
					dispatch(setAmount(fieldValue));
					break;
				case 'date':
					dispatch(setDate(fieldValue));
					break;
				case 'rate':
					dispatch(setRate(fieldValue));
					break;
				default:
					break;
			}
		});
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
		<div>
			<form className="max-w-xl mx-auto w-full md:w-1/2 lg:w-1/3" onSubmit={handleSubmit}>
				{formFields.map(field => (
					<FormField
						key={field.name}
						field={field}
						handleInputChange={handleInputChangeCustom}
						value={getFieldValue(field.name)}
						errors={errors}
					/>
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
		</div>
	);
}

export default ExchangeForm;
