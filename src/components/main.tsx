import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useStore from '../stores/store';
import InputForm from './input/inputForm';
import HistoryList from './historyList/historyList';
import LatestShortURL from './latestShortURL/latestShortURL';
import { ShortenButton } from '../styles/button';
import { InputWrapper } from '../styles/input';
// import axios from 'axios';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const LatestShortURLStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	text-align: center;
	align-items: center;
	padding: 15px;
	width: 534px;
	height: 60px;
	font-size: 20px;

	@media (max-width: 768px) {
		width: 367px;
		font-size: 17px;
	}
`;

export default function Main() {
	const inputValue = useStore((state) => state.inputValue);
	const historyList = useStore((state) => state.historyList);
	const latestShortURL = useStore((state) => state.latestShortURL);
	const isSearchOpen = useStore((state) => state.isSearchOpen);
	const isCopied = useStore((state) => state.isCopied);
	const validMessage = useStore((state) => state.validMessage);
	const searchRef = useRef(null);

	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		useStore.setState({ inputValue: e.target.value });
		useStore.setState({ validMessage: '' });
	};

	/*
	const fetchData = async ()=>{
		try{
			const res = await axios(`https://api.shortyshorty.site/shorten?url=${inputValue}`)
			setLatestShortURL
		}catch(err){
			alert(err)
		}
	}
	*/

	const shortenButtonClick = (e: React.FormEvent) => {
		e.preventDefault();
		const isValidUrl =
			/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(inputValue);
		if (isValidUrl) {
			useStore.setState((state) => ({
				historyList: [state.inputValue, ...state.historyList],
				inputValue: '',
				latestShortURL: state.inputValue,
				isSearchOpen: false,
			}));
		} else {
			useStore.setState({ validMessage: 'please enter valid URL' });
		}
	};

	const inputFocus = () => {
		useStore.setState({ isSearchOpen: true });
	};

	const handleCopyUrl = async (url: string) => {
		try {
			await navigator.clipboard.writeText(url);
			useStore.setState({ isCopied: true });

			setTimeout(() => {
				useStore.setState({ isCopied: false });
			}, 2000);
		} catch (err) {
			console.error('failed copied', err);
		}
	};

	const handleDelete = (index: number) => {
		console.log('Delete button clicked');
		const updatedList = [...historyList];
		updatedList.splice(index, 1);
		useStore.setState({ historyList: updatedList });
	};

	useEffect(() => {
		console.log('History List Updated:', historyList);
	}, [historyList]);

	const closeSearch = () => {
		useStore.setState({ isSearchOpen: false });
	};

	useOutsideClick({
		ref: searchRef,
		handler: closeSearch,
	});

	return (
		<Wrapper ref={searchRef}>
			<InputWrapper onSubmit={shortenButtonClick}>
				<InputForm
					inputValue={inputValue}
					onInputChange={inputChange}
					onFocus={inputFocus}
					isSearchOpen={isSearchOpen}
					historyList={historyList}
				/>
				<ShortenButton type='submit'>shorten</ShortenButton>
				{isSearchOpen && (
					<HistoryList
						historyList={historyList}
						handleCopyUrl={handleCopyUrl}
						handleDelete={handleDelete}
						isCopied={isCopied}
					/>
				)}
			</InputWrapper>

			<LatestShortURLStyle>
				{validMessage ? (
					<span style={{ color: 'red' }}>{validMessage}</span>
				) : (
					<>
						<span>{latestShortURL}</span>
						{latestShortURL && (
							<LatestShortURL
								latestShortURL={latestShortURL}
								handleCopyUrl={handleCopyUrl}
								isCopied={isCopied}
							/>
						)}
					</>
				)}
			</LatestShortURLStyle>
		</Wrapper>
	);
}
