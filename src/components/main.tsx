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
import { BeatLoader } from 'react-spinners';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const LatestShortURLStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	text-align: center;
	align-items: center;
	padding: 15px;
	width: 600px;
	height: 60px;
	font-size: 20px;
	color: #51474e;

	@media (max-width: 768px) {
		width: 367px;
		font-size: 17px;
	}

	span {
		position: relative;

		&::before,
		&::after {
			content: '';
			position: absolute;
			width: 50%;
			height: 4px;
			background-color: #d9967e;
			bottom: -7px;
		}

		&::before {
			left: 0;
			border-radius: 5px 0 0 5px;
		}

		&::after {
			right: 0;
			border-radius: 0 5px 5px 0;
		}
	}
`;

const LoadingStyle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 15px;
`;

export default function Main() {
	const [loading, setLoading] = useState(false);
	const inputValue = useStore((state) => state.inputValue);
	const historyList = useStore((state) => state.historyList);
	const latestShortURL = useStore((state) => state.latestShortURL);
	const isSearchOpen = useStore((state) => state.isSearchOpen);
	const searchRef = useRef(null);

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
				toast.error('URL을 줄이는데 실패했습니다.');
			}
		} else {
			toast.error('https://를 포함한 정확한 URL을 입력해주세요 ');
			setLoading(false);
		}
	};

	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		useStore.setState({
			inputValue: e.target.value,
		});
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
			</InputWrapper>

			{isSearchOpen && (
				<HistoryList
					handleCopyUrl={handleCopyUrl}
					handleDelete={handleDelete}
					historyList={historyList}
				/>
			)}

			{!loading ? (
				<LatestShortURLStyle>
					<span>{latestShortURL}</span>
					{latestShortURL && (
						<LatestShortURLCopy
							latestShortURL={latestShortURL}
							handleCopyUrl={handleCopyUrl}
						/>
					)}
				</LatestShortURLStyle>
			) : (
				<LoadingStyle>
					<BeatLoader color='#d9967e' />
				</LoadingStyle>
			)}

			<ToastContainer position='top-center' />
		</Wrapper>
	);
}
