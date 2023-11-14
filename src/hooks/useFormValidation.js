import { useState } from 'react';

export function useFormValidation(formFields, initialState) {
	const [errors, setErrors] = useState({});

	const handleInputChange = (name, value, dispatch) => {
		const field = formFields.find(f => f.name === name);
		if (field && field.validate) {
			const errorMessage = field.validate(value);
			setErrors(prevErrors => ({ ...prevErrors, [name]: errorMessage }));
		}

		dispatch(name, value);
	};

	const validateAllFields = () => {
		const errorsFound = {};
		formFields.forEach(field => {
			const errorMessage = field.validate && field.validate(initialState[field.name]);
			if (errorMessage) {
				errorsFound[field.name] = errorMessage;
			}
		});
		setErrors(errorsFound);
		return Object.keys(errorsFound).length === 0;
	};

	const getFieldValue = fieldName => initialState[fieldName];

	return { handleInputChange, validateAllFields, getFieldValue, errors, setErrors };
}
