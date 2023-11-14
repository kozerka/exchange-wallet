import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchExchangeRate,
	addTransactionThunk,
	removeTransactionThunk,
	updateTransactionHistoryThunk,
} from '../store/thunks/exchangeThunks';
import { headersConfig } from '../utils/headersConfig';
import TableContainer from './TableContainer';
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
import Form from './Form';
import { calculatePercentageChange } from '../utils/calculatePercentageChange';
import Modal from './Modal';
import TransactionModalContent from './TransactionModalContent';
import UpdateCurrencies from './UpdateCurrencies';
import { useCurrentRate, useFetchExchangeRate, useFormValidation } from '../hooks';

const ExchangeWallet = () => {
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
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [transactionIdToRemove, setTransactionIdToRemove] = useState(null);

	const handleRemoveTransaction = id => {
		const transactionToRemove = transactions.find(t => t.id === id);
		setIsModalOpen(true);
		setTransactionIdToRemove(transactionToRemove);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setTransactionIdToRemove(null);
	};

	const confirmRemoveTransaction = () => {
		dispatch(removeTransactionThunk(transactionIdToRemove.id));
		setIsModalOpen(false);
		setTransactionIdToRemove(null);
	};

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
			console.error('Error while updating transaction history', error);
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
				rate: parseFloat(rateModifiedByUser ? rate : selectedRate).toFixed(2),
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

	const contentForModal = transactionIdToRemove ? (
		<TransactionModalContent transaction={transactionIdToRemove} />
	) : null;

	return (
		<div className={'flex m-4'}>
			<Form
				handleSubmit={handleSubmit}
				formFields={formFields}
				handleInputChangeCustom={handleInputChangeCustom}
				getFieldValue={getFieldValue}
				errors={errors}
				status={status}
			/>
			<div className={'w-4/5 pl-8 pr-6'}>
				<UpdateCurrencies
					transactions={transactions}
					handleUpdateHistory={handleUpdateHistory}
					lastUpdatedDate={lastUpdatedDate}
				/>
				<TableContainer
					headersConfig={headersConfig}
					rows={transactions}
					onRemove={handleRemoveTransaction}
				/>
				<Modal
					isOpen={isModalOpen}
					onClose={closeModal}
					content={contentForModal}
					onAccept={confirmRemoveTransaction}
					onCancel={closeModal}
				/>
			</div>
		</div>
	);
};

export default ExchangeWallet;
