import PropTypes from 'prop-types';
import { GoSync } from 'react-icons/go';

function Button({ children, primary, secondary, loading, ...rest }) {
	const baseClasses = 'px-4 py-2 border rounded flex items-center cursor-pointer w-full';
	const primaryClasses = primary
		? 'focus:outline-none text-black text-lg bg-yellow-400 hover:bg-orange-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
		: '';
	const secondaryClasses = secondary ? 'border-gray-400 bg-gray-400 text-white' : '';
	const loadingClasses = loading ? 'opacity-80 bg-orange-500 border-orange-500 text-white ' : '';
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
	children: PropTypes.node,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	loading: PropTypes.bool,
};

export default Button;
