import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import useStore from '../stores/store';
import InputForm from './input/inputForm';
import HistoryList from './historyList/historyList';
import LatestShortURLCopy from './latestShortURL/latestShortURL';
import { ShortenButton } from '../styles/button';
import { InputWrapper } from '../styles/input';
import { postApi } from '../config/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
	const inputValue = useStore((state) => state.inputValue);
	const historyList = useStore((state) => state.historyList);
	const latestShortURL = useStore((state) => state.latestShortURL);
	const isSearchOpen = useStore((state) => state.isSearchOpen);
	const validMessage = useStore((state) => state.validMessage);
	const searchRef = useRef(null);

	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		useStore.setState({
			inputValue: e.target.value,
			validMessage: '',
		});
	};

	const shortenButtonClick = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const isValidUrl =
			/(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(inputValue);
		if (isValidUrl) {
			try {
				setLoading(true);

				const shortCode = await postApi(inputValue);
				const shortenedUrl = `https://shortyshorty.site/${shortCode}`;

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
				toast.success('URL이 성공적으로 줄어들었습니다.');
			} catch (err) {
				setLoading(false);
				useStore.setState({ validMessage: 'Failed to shorten URL' });
			}
		} else {
			useStore.setState({ validMessage: 'please enter valid URL' });
			console.log('else');
			setLoading(false);
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
			toast.success('URL이 복사되었습니다.');
		} catch (err) {
			toast.error('URL 복사에 실패했습니다.');
		}
	};

	const handleDelete = (index: number) => {
		const updatedList = [...historyList];
		updatedList.splice(index, 1);
		useStore.setState({ historyList: updatedList });
	};

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
						historyList={historyList}
					/>
				)}
			</InputWrapper>

			<LatestShortURLStyle>
				{loading ? (
					'Loading...'
				) : (
					<>
						{validMessage ? (
							<span style={{ color: 'red' }}>{validMessage}</span>
						) : (
							<>
								<span>{latestShortURL}</span>
								{latestShortURL && (
									<LatestShortURLCopy
										latestShortURL={latestShortURL}
										handleCopyUrl={handleCopyUrl}
									/>
								)}
							</>
						)}
					</>
				)}
			</LatestShortURLStyle>
			<ToastContainer position='top-center' />
		</Wrapper>
	);
}
