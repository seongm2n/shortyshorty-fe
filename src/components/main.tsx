import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const InputWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 20px;
	width: 534px;
	height: 60px;
	font-size: 20px;

	@media (max-width: 768px) {
		width: 367px;
		font-size: 17px;
	}
`;

const Button = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 0;
	padding: 8px;
	margin-right: 10px;
	background-color: #d9967e;
	color: #f2f2eb;
	border: 1px solid #d9967e;
	border-radius: 15px;
	font-size: 16px;
	cursor: pointer;

	&:hover {
		background-color: #b5645a;
	}

	@media (max-width: 768px) {
	}
`;

export default function Main() {
	return (
		<Wrapper>
			<InputWrapper>
				<Input
					type='text'
					placeholder='Please enter a long URL...'
				/>
				<Button>short</Button>
			</InputWrapper>
		</Wrapper>
	);
}
