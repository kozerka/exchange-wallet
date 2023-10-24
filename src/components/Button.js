import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { GoSync } from 'react-icons/go';

const spinAnimation = keyframes`
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`;

const StyledGoSync = styled(GoSync)`
	animation: ${spinAnimation} 1s linear infinite;
`;

const StyledButton = styled.button`
	padding: 0.375rem 1rem;
	border: 1px solid transparent;
	cursor: pointer;
	display: flex;
	align-items: center;

	${props =>
		props.primary &&
		`
		border-color: blue;
		background-color: blue;
		color: white;
	`}

	${props =>
		props.secondary &&
		`
		border-color: gray;
		background-color: gray;
		color: white;
	`}

	${props =>
		props.loading &&
		`
		opacity: 0.8;
	`}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;

function Button({ children, primary, secondary, loading, ...rest }) {
	return <StyledButton {...rest}>{loading ? <StyledGoSync /> : children}</StyledButton>;
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	primary: PropTypes.bool,
	secondary: PropTypes.bool,
	loading: PropTypes.bool,
};

export default Button;
