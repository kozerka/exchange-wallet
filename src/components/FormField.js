import PropTypes from 'prop-types';

function FormField({ field, handleInputChange, value, errors }) {
	return (
		<div className="mb-6" key={field.name}>
			<label className="block mb-2 text-sm font-medium text-gray-900 text-gray-800">
				{field.label}:
				{field.type === 'radio' && (
					<div className="flex flex-row mb-4">
						{field.options.map(option => (
							<label key={option} className="flex items-center mr-4">
								<input
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
									type={'radio'}
									name={field.name}
									value={option}
									checked={value === option}
									onChange={e => handleInputChange(field.name, e.target.value)}
								/>
								<span className="ml-2">{option}</span>
							</label>
						))}
					</div>
				)}
				{field.type === 'select' && (
					<select
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 "
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
					<div>
						<input
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  0"
							type={field.type}
							name={field.name}
							value={value || ''}
							onChange={e => {
								const inputValue =
									field.type === 'number' ? Number(e.target.value) : e.target.value;
								handleInputChange(field.name, inputValue);
							}}
						/>
						{field.name === 'profitLoss' && (
							<span
								className={`inline-block mt-2 px-4 py-1 text-sm font-medium rounded ${
									value < 0 ? 'bg-red-500' : value > 0 ? 'bg-green-500' : 'bg-blue-500'
								}`}
							>
								{value}%
							</span>
						)}
					</div>
				)}
			</label>
			{errors[field.name] && (
				<div
					className="flex items-center p-4 mb-4 text-sm text-gray-600 border border-yellow-300 rounded-lg bg-yellow-50 "
					role="alert"
				>
					<svg
						className="flex-shrink-0 inline w-4 h-4 mr-3"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
					</svg>
					<span className="sr-only">Error</span>
					<div>
						<span className="font-medium">Error:</span> {errors[field.name]}
					</div>
				</div>
			)}
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
