import { BiLink, BiLike } from 'react-icons/bi';
import { GrSecure } from 'react-icons/gr';
import { MdDevices } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const StyledBiLike = styled(BiLike)`
	font-size: 30px;

	&:hover {
		color: #bf533b;
		animation: ${bounceAnimation} 1s infinite;
	}
`;
const StyledBiLink = styled(BiLink)`
	font-size: 30px;

	&:hover {
		color: #bf533b;

		animation: ${bounceAnimation} 1s infinite;
	}
`;
const StyledGrSecure = styled(GrSecure)`
	font-size: 30px;

	&:hover {
		color: #bf533b;

		animation: ${bounceAnimation} 1s infinite;
	}
`;
const StyledMdDevices = styled(MdDevices)`
	font-size: 30px;

	&:hover {
		color: #bf533b;

		animation: ${bounceAnimation} 1s infinite;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;

	.firstP {
		color: #675962;
	}

	@media screen and (max-width: 768px) {
		margin: 10px 50px 50px 50px;
	}
`;

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, auto);
	gap: 20px;
	margin-top: 20px;
`;

const GridItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	border: 1px solid #ccc;
	padding: 20px;
	border-radius: 20px;

	h3 {
		font-size: 20px;
		margin: 20px;

		@media screen and (max-width: 768px) {
			font-size: 15px;
		}
	}

	p {
		font-size: 16px;
		line-height: 1.5;
		@media screen and (max-width: 768px) {
			font-size: 13px;
		}
	}
`;

export default function About() {
	return (
		<Wrapper>
			<p className='firstP'>What is ShortyShorty</p>
			<GridWrapper>
				<GridItem>
					<StyledBiLike />
					<h3>Easy</h3>
					<p>
						ShortURL은 간편하고 빠릅니다. 긴 링크를 입력하여 단축된 링크를
						받으세요.
					</p>
				</GridItem>
				<GridItem>
					<StyledBiLink />
					<h3>Shortend</h3>
					<p>
						어떤 크기의 링크든 사용 가능합니다. shortURL은 항상 단축시켜줍니다.
					</p>
				</GridItem>
				<GridItem>
					<StyledGrSecure />
					<h3>Secure</h3>
					<p>
						빠르고 안전합니다. 저희 서비스는 HTTPS 프로토콜을 사용해 안전하게
						사용하고 있습니다
					</p>
				</GridItem>
				<GridItem>
					<StyledMdDevices />
					<h3>Devices</h3>
					<p>스마트폰, 태블릿 및 데스크톱과 호환 가능합니다.</p>
				</GridItem>
			</GridWrapper>
		</Wrapper>
	);
}
