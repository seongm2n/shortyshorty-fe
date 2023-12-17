import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useStore from '../stores/store';
import InputForm from './input/inputForm';
import HistoryList from './historyList/historyList';
import LatestShortURLCopy from './latestShortURL/latestShortURL';
import { ShortenButton } from '../styles/button';
import { InputWrapper } from '../styles/input';
import { postApi } from '../config/axios';

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
	const [loading, setLoading] = useState(false);
	const [key, setKey] = useState('');
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

	const shortenButtonClick = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const isValidUrl =
			/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(inputValue);
		if (isValidUrl) {
			try {
				setLoading(true);

				const newShortCode = await postApi(inputValue);
				const shortenedUrl = `https://shortyshorty.site/${newShortCode}`;
				setKey(newShortCode);
				setLoading(false);
				useStore.setState((state) => ({
					historyList: [
						{
							originURL: state.inputValue,
							shortenURL: shortenedUrl,
						},
						...state.historyList,
					],
					inputValue: '',
					latestShortURL: shortenedUrl,
					isSearchOpen: false,
				}));
			} catch (err) {
				setLoading(false);
				useStore.setState({ validMessage: 'Failed to shorten URL' });
			}
		} else {
			setLoading(false);
			useStore.setState({ validMessage: 'please enter valid URL' });
		}
	};

	const inputFocus = () => {
		useStore.setState({ isSearchOpen: true });
	};

	const handleCopyUrl = async (
		item: string | { originURL: string; shortenURL: string }
	) => {
		try {
			const urlToCopy = typeof item === 'string' ? item : item.shortenURL;
			await navigator.clipboard.writeText(urlToCopy);
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
				<ShortenButton
					type='submit'
					disabled={loading}
				>
					shorten
				</ShortenButton>
				{isSearchOpen && (
					<HistoryList
						handleCopyUrl={handleCopyUrl}
						handleDelete={handleDelete}
						isCopied={isCopied}
						historyList={historyList}
					/>
				)}
			</InputWrapper>

			<LatestShortURLStyle>
				{loading ? 'Loading...' : ''}
				{validMessage ? (
					<span style={{ color: 'red' }}>{validMessage}</span>
				) : (
					<>
						<span>{latestShortURL}</span>
						{latestShortURL && (
							<LatestShortURLCopy
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
