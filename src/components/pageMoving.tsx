import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';

const PageLoadingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 70vh;

	p {
		margin: 15px 0;
		font-size: 18px;
		color: #51474e;
	}

	.loader {
		margin-top: 15px;
		align-items: center;
		justify-content: center;
	}
`;

export default function PageMoving() {
	return (
		<PageLoadingWrapper>
			<p>잠시만 기다려주세요</p>
			<p>페이지 이동 중</p>
			<PropagateLoader
				className='loader'
				color='#d9967e'
			/>
		</PageLoadingWrapper>
	);
}
