# <center>ShortyShorty</center>

> 긴 url을 짧게 줄여주는 서비스
### 배포사이트 :  http://www.shortyshorty.site
---

### 기간 : 2023.10 ~ 2024.01
---

### 스택
  ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
  ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
  ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
  ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
  

  ![React](https://img.shields.io/badge/react-ffffff?style=for-the-badge&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
  ![react-router-dom](https://img.shields.io/badge/react--router--dom-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![Styled-Components](https://img.shields.io/badge/styled--components%20CSS-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)
  ![Zustand](https://img.shields.io/badge/zustand-000000?style=for-the-badge&logo=styledcomponents&logoColor=white)
  ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

---
### 기능 구현
- 원본URL을 짧게 변환

  - 원본URL에 대한 shortCode를 서버에 POST요청을 해서 받아옴.
  - 받아온 shortCode는 https://www.shortyshorty.site/{shortCode} 이런식으로 쓰임

- Shorten한 URL을 원본URL로 리다이렉션
  - https://www.shortyshorty.site/{shortCode} 이 URL을 브라우저에서 사용했을 경우 shortCode의 존재를 먼저 판별하고 있다면 원본URL을 조회하게 GET으로 요청 후 shortCode에 대한 원본URL을 찾으면 바로 페이지 이동

  [트러블슈팅] 
  - [www.shortyshorty.site/{shortCode}로](http://www.shortyshorty.site/{shortCode}로) 리다이렉션 시켰을 경우 404에러가 뜨면서 경로 문제가 생긴것을 확인
  - 유료 도메인과 react 경로가 일치 하지 않는 것을 확인
  - vercel로 배포했기 때문에 따로 vercel.json을 추가해서 코드를 추가해줌
  ```
  {
  "routes": [
    {
      "src": "/:key",
      "status": 301,
      "headers": { "Location": "https://api.shortyshorty.site/:key" }
    }
  ]
  }
  ```

- 히스토리 리스트
    - Shorten URL을 내림차순으로 정렬
    - 최대 10개로 제한을 두었고 10개가 넘어가면 젤 아래 URL이 안보이게 됌
    - 모바일의 경우 2개로 제한을 두었음
    - copy, delete 버튼을 사용해서 삭제, 복사 가능

    **[트러블슈팅]**

  - 히스토리 리스트 안에서  복사버튼을 누를 때 shorten하는 버튼까지 눌리는 현상
  - input폼 안에 히스토리리스트를 묶어놓아서 렌더링될 때 눌리게 됌
  - 1번째 시도 : 히스토리 리스트를 inputForm 밖으로 빼고 렌더링 했을 때 브라우저 화면에 보이지 않았음 → searchForm에 문제가 있는줄 알고 searchForm을 눌렀을 때 상태를 확인! 하지만 상태에 문제는 없었음
  - 2번째 시도 : CSS에 문제가 있나 해서 position을 수정해봄
      - input폼 안에 히스토리리스트가 있었을 때 position이 상위가 relative여서 히스토리리스트를 position:absolute로 했던건데 이게 문제였음
      - position: absolute를 삭제

- 마우스 이벤트
    - Shorten URL  검색창 이외의 공간을 마우스로 눌렀을 경우 검색창이 닫히고 Shorten URL 변환 히스토리가 남아있는경우 검색창을 눌렀을 경우 검색창이 열림

- 로딩(변환 로딩, 페이지 이동 로딩)
    - 서로 다른 쓰임새이기에 로딩페이지의 재사용 사용 안함
    - 변환하는데 걸리는 시간이 사용자들은 페이지가 멈춘 것으로 오해할 수 있기 때문에긴 URL을 Shorten 시킬 때 로딩 추가
    ---
    
    - 페이지가 원본 URL로 이동할 때 시간이 걸리기 때문에 페이지이동 로딩페이지 따로 생성
    - 현재는 페이지이동 시간이 줄어든 것을 확인

- 에러페이지
    - 에러핸들링에 추가되어 있지 않은 에러는 모두 ErrorElement로 분류

- 에러핸들링
    - 상태 코드 502, 500, 404, timeoutErro에 대한 에러 메시지를 Toast 라이브러리를 사용해서 노출

- 구글브라우저에 웹사이트 주소 등록
- 구글 애널리스틱스(사용자 방문추적기능 추가)