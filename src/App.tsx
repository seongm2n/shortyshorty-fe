import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reset from 'styled-reset';
import './App.css';
import Layout from './components/layout';
import Home from './routes/home';
import About from './routes/about';
import styled, { createGlobalStyle } from 'styled-components';
import RedirectComponent from './components/redirect';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '',
					element: <Home />,
				},
				{ path: 'about', element: <About /> },
				{ path: ':key', element: <RedirectComponent key={''} /> },
			],
		},
	],
	{ basename: process.env.PUBLIC_URL }
);

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
			<RouterProvider router={router} />
		</Wrapper>
	);
}

export default App;
