import PropTypes from 'prop-types';

function FormField({ field, handleInputChange, value, errors }) {
	return (
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
								checked={value === option}
								onChange={e => handleInputChange(field.name, e.target.value)}
							/>
							{option}
						</span>
					))}
				{field.type === 'select' && (
					<select
						name={field.name}
						value={value}
						onChange={e => handleInputChange(field.name, e.target.value)}
					>
						{field.options.map(option => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				)}
				{['number', 'date'].includes(field.type) && (
					<input
						type={field.type}
						name={field.name}
						value={value || ''}
						onChange={e => {
							const inputValue = field.type === 'number' ? Number(e.target.value) : e.target.value;
							handleInputChange(field.name, inputValue);
						}}
					/>
				)}
			</label>
			{errors[field.name] && <p style={{ color: 'red' }}>{errors[field.name]}</p>}
		</div>
	);
}
FormField.propTypes = {
	field: PropTypes.shape({
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['radio', 'select', 'number', 'date']).isRequired,
		options: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
	handleInputChange: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	errors: PropTypes.objectOf(PropTypes.string),
};

export default FormField;
