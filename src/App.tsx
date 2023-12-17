import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reset from 'styled-reset';
import './App.css';
import Layout from './components/layout';
import Home from './routes/home';
import About from './routes/about';
import styled, { createGlobalStyle } from 'styled-components';
import RedirectComponent from './components/redirect';

const GlobalStyled = createGlobalStyle`
	${reset};
		*{
			box-sizing: border-box;
			text-decoration: none;
			color:inherit;
		}
		body{
			background-color: #F2F2EB;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}
`;

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
`;

function App() {
	return (
		<Wrapper>
			<GlobalStyled />
			<Router basename="/">
				<Routes>
					<Route
						path='/'
						element={<Layout />}
					>
						<Route
							path=''
							element={<Home />}
						/>
						<Route
							path='about'
							element={<About />}
						/>
						<Route
							path=':key'
							element={<RedirectComponent />}
						/>
					</Route>
				</Routes>
			</Router>
		</Wrapper>
	);
}

export default App;
