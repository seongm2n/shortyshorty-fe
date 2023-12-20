import styled from 'styled-components';

export const Input = styled.input`
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 20px;
	width: 600px;
	height: 60px;
	font-size: 18px;
	outline: none;
	cursor: pointer;

	@media (max-width: 768px) {
		width: 367px;
		font-size: 17px;
	}
`;

export const InputWrapper = styled.form`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;
