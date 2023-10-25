import PropTypes from 'prop-types';
import { GoSync } from 'react-icons/go';

function Button({ children, primary, secondary, loading, ...rest }) {
	const baseClasses = 'px-4 py-2 border rounded flex items-center cursor-pointer w-full';
	const primaryClasses = primary ? 'border-red-500 bg-red-500 text-white' : '';
	const secondaryClasses = secondary ? 'border-gray-400 bg-gray-400 text-white' : '';
	const loadingClasses = loading ? 'opacity-80 bg-red-600 border-red-600 text-white ' : '';
	const disabledClasses = rest.disabled ? 'opacity-60 cursor-not-allowed' : '';

	return (
		<button
			className={`${baseClasses} ${primaryClasses} ${secondaryClasses} ${loadingClasses} ${disabledClasses}`}
			{...rest}
		>
			{loading ? (
				<>
					<GoSync className="animate-spin mr-2" />
					Loading...
				</>
			) : (
				children
			)}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	loading: PropTypes.bool,
};

export default Button;
