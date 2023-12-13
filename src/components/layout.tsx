import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px;
	height: 100%;
	width: 100%;
	max-width: 860px;

	@media (min-width: 768px) {
		padding: 50px;
	}
`;

const headerStyles = css`
	display: flex;
	justify-content: center;
	width: 100%;
	font-size: 60px;
	font-weight: 300;
	color: #bf533b;
	line-height: normal;
	text-decoration: none;
	padding-top: 100px;

	@media (min-width: 768px) {
		font-size: 80px;
		padding-top: 200px;
	}
`;

const Header = styled.div`
	${headerStyles}

	&.about-page-header {
		font-size: 30px;
		padding-top: 10px;

		@media (min-width: 768px) {
			font-size: 40px;
			padding-top: 20px;
		}
	}
`;

const Footer = styled.div`
	position: fixed;
	bottom: 20px;
	display: flex;
	justify-content: center;
	width: 100%;
	font-size: 20px;
	font-weight: 400;
	color: #675962;

	@media (min-width: 768px) {
		bottom: 40px;
		font-size: 25px;
	}
`;

export default function Layout() {
	const location = useLocation();
	const [aboutPage, setAboutPage] = useState(location.pathname === '/about');

	useEffect(() => {
		setAboutPage(location.pathname === '/about');
	}, [location.pathname]);

	return (
		<Wrapper>
			<Header className={aboutPage ? 'about-page-header' : ''}>
				<Link to='/'>shortyshorty</Link>
			</Header>
			<Outlet />
			<Footer>
				{aboutPage ? <Link to='/'>Home</Link> : <Link to='/about'>About</Link>}
			</Footer>
		</Wrapper>
	);
}
