import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Button from './Button';

const Modal = ({ isOpen, onClose, content, onAccept, onCancel }) => {
	if (!isOpen) return null;

	const stopPropagation = e => {
		e.stopPropagation();
	};

	return ReactDOM.createPortal(
		<div
			className={
				'fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md'
			}
			onClick={onClose}
		>
			<div
				className={
					'bg-white p-8 rounded-lg w-[600px] h-[540px] relative flex flex-col justify-between'
				}
				onClick={stopPropagation}
			>
				<IoIosCloseCircleOutline
					className={'absolute top-2 right-2 focus:outline-none cursor-pointer hover:text-red-500'}
					size={30}
					onClick={onClose}
				/>
				<div className={'flex-grow flex items-center justify-center'}>{content}</div>
				<div className={'flex justify-center mt-4'}>
					<Button
						primary
						onClick={onCancel}
						className={
							'border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline mr-2 w-[100px]'
						}
					>
						Cancel
					</Button>
					<Button
						primary
						onClick={onAccept}
						className={
							'border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline w-[120px]'
						}
					>
						Yes, delete!
					</Button>
				</div>
			</div>
		</div>,
		document.getElementById('root-modal')
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	content: PropTypes.node,
	onAccept: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Modal;
