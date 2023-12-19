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
    color:#51474e;
  }
`;

export default function PageMoving() {
  return (
    <PageLoadingWrapper>
      <p>잠시만 기다려주세요</p>
      <p>페이지 이동 중</p>
      <PropagateLoader color='#d9967e' />
    </PageLoadingWrapper>
  );
}
