import FormField from './FormField';
import Button from './Button';
import PropTypes from 'prop-types';

const Form = ({
	handleSubmit,
	formFields,
	handleInputChangeCustom,
	getFieldValue,
	errors,
	status,
}) => {
	return (
		<form className={'max-w-xl mx-auto w-1/5 ml-8'} onSubmit={handleSubmit}>
			<h1
				className={
					'text-center font-bold text-xl mt-4 mb-4 p-4 w-full bg-yellow-400 text-black px-4 py-5 rounded block text-lg'
				}
			>
				Please provide transaction
			</h1>

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
	);
};

Form.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	formFields: PropTypes.array.isRequired,
	handleInputChangeCustom: PropTypes.func.isRequired,
	getFieldValue: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	status: PropTypes.string.isRequired,
};

export default Form;
