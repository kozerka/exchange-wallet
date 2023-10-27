import PropTypes from 'prop-types';
import { BsTrash3 } from 'react-icons/bs';
import { GrLineChart } from 'react-icons/gr';

const ActionButtons = ({ onRemove, handleRowClick }) => (
	<>
		<button onClick={onRemove}>
			<BsTrash3 size={'1.2rem'} className={'hover:text-red-500'} />
		</button>
		<button onClick={handleRowClick}>
			<GrLineChart size={'1.2rem'} className={'hover:text-blue-500 ml-4'} />
		</button>
	</>
);

ActionButtons.propTypes = {
	onRemove: PropTypes.func.isRequired,
	handleRowClick: PropTypes.func.isRequired,
};

export default ActionButtons;
