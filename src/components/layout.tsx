import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 50px;
	height: 100%;
	width: 100%;
	max-width: 860px;
`;

const Header = styled.div<{ aboutPage: boolean }>`
	display: flex;
	justify-content: center;
	width: 100%;
	font-size: ${(props) => (props.aboutPage ? '40px' : '80px')};
	font-weight: 300;
	color: #bf533b;
	line-height: normal;
	text-decoration: none;
	padding-top: ${(props) => (props.aboutPage ? '20px' : '200px')};
`;

const Footer = styled.div`
	position: fixed;
	bottom: 40px;
	display: flex;
	justify-content: center;
	width: 100%;
	font-size: 25px;
	font-weight: 400;
	color: #675962;
`;

export default function Layout() {
	const location = useLocation();
	const [aboutPage, setAboutPage] = useState(location.pathname === '/about');

	useEffect(() => {
		setAboutPage(location.pathname === '/about');
	}, [location.pathname]);

	return (
		<Wrapper>
			<Header aboutPage={aboutPage}>
				<Link to='/'>shortyshorty</Link>
			</Header>
			<Outlet />
			<Footer>
				{aboutPage ? <Link to='/'>Home</Link> : <Link to='/about'>About</Link>}
			</Footer>
		</Wrapper>
	);
}

//header 부분이 about, shortyshorty 꾸미기
