import styled from 'styled-components';
import Main from '../components/main';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px;
`;
export default function Home() {
	return (
		<Wrapper>
			<Main />
		</Wrapper>
	);
}
