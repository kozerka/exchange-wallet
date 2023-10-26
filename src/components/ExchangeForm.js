import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchExchangeRate,
	addTransactionThunk,
	removeTransactionThunk,
	updateTransactionHistoryThunk,
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
	updateTransactionHistory,
	setLastUpdatedDate,
} from '../store/slices/exchangeSlice';
import Button from './Button';
import FormField from './FormField';
import useCurrentRate from '../hooks/useCurrentRate';
import useFormValidation from '../hooks/useFormValidation';
import { calculatePercentageChange } from '../utils/calculatePercentageChange';
import { getPolishDateTime } from '../utils/getPolishDateTime';
import { GiClick } from 'react-icons/gi';
import { useFetchExchangeRate } from '../hooks/useFetchExchangeRate';
function ExchangeForm() {
	const dispatch = useDispatch();

	const status = useSelector(state => state.exchange.status);
	const transactions = useSelector(state => state.exchange.transactions);
	const currency = useSelector(state => state.exchange.currency);
	const base = useSelector(state => state.exchange.base);
	const amount = useSelector(state => state.exchange.amount);
	const date = useSelector(state => state.exchange.date);
	const rate = useSelector(state => state.exchange.rate);
	const rateModifiedByUser = useSelector(state => state.exchange.rateModifiedByUser);
	const currentRate = useCurrentRate(base, currency);
	const { selectedRate } = useFetchExchangeRate(base, date, currency, rateModifiedByUser);
	const lastUpdatedDate = useSelector(state => state.exchange.lastUpdatedDate);
	const { handleInputChange, validateAllFields, getFieldValue, errors, setErrors } =
		useFormValidation(formFields, {
			currency,
			base,
			amount,
			date,
			rate,
		});

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
	const handleUpdateHistory = async transactionId => {
		try {
			await dispatch(updateTransactionHistoryThunk(transactionId));
			dispatch(setLastUpdatedDate(new Date().toISOString()));
			dispatch(resetForm());
		} catch (error) {
			console.error('Błąd podczas aktualizacji historii:', error);
		}
	};

	const handleAddTransaction = () => {
		const roundedCurrentRate = Number(currentRate.toFixed(2));
		const currentValue = (rate * amount).toFixed(2);
		const purchaseValue = (roundedCurrentRate * amount).toFixed(2);
		const profitLossValue = Number((roundedCurrentRate * amount - currentValue).toFixed(2));
		const percentageChange = calculatePercentageChange(currentValue, purchaseValue).toFixed(2);
		const profitLossDisplayValue = `${profitLossValue} (${percentageChange}%)`;
		const transactionId = Date.now();
		dispatch(
			addTransactionThunk({
				id: transactionId,
				symbols: currency,
				base,
				amount,
				date,
				rate: rateModifiedByUser ? rate : selectedRate.toFixed(2),
				history: [
					{
						date: new Date().toISOString(),
						currentRate: roundedCurrentRate,
						currentValue,
						profitLoss: profitLossDisplayValue,
					},
				],
			})
		);
		const newHistoryEntry = {
			date: new Date().toISOString(),
			currentRate: roundedCurrentRate,
			currentValue,
			profitLoss: profitLossDisplayValue,
		};

		dispatch(updateTransactionHistory({ id: transactionId, history: newHistoryEntry }));
		dispatch(resetForm());
	};

	const handleRemoveTransaction = id => {
		dispatch(removeTransactionThunk(id));
	};
	return (
		<div className={'flex m-4'}>
			<form className={'max-w-xl mx-auto w-1/5'} onSubmit={handleSubmit}>
				<h1 className={'text-center font-bold text-xl m-4 p-4'}>Please provide transaction</h1>
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
			<div className={'w-4/5 pl-8 pr-6'}>
				<div className={'m-4'}>
					<Button
						className={
							'w-full bg-yellow-400 hover:bg-orange-500 text-black px-4 py-2 rounded block text-lg'
						}
						onClick={() => transactions.forEach(t => handleUpdateHistory(t.id))}
					>
						<span>Current data for the date: </span>
						<span className={'font-bold'}>
							{lastUpdatedDate ? getPolishDateTime(new Date(lastUpdatedDate)) : 'not available'}.
						</span>
						<br />
						<span className={'uppercase mx-2 my-1'}>Click to update.</span>{' '}
						<GiClick className={'inline-block ml-2'} />
					</Button>
				</div>
				<Table
					headersConfig={headersConfig}
					rows={transactions}
					onRemove={handleRemoveTransaction}
				/>
			</div>
		</div>
	);
}

export default ExchangeForm;
