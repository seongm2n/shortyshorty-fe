import React from 'react';
import styled from 'styled-components';
import { CopyButton, DeleteButton } from '../../styles/button';

const HistoryListStyle = styled.ul`
	top: 100%;
	left: 0;
	width: 100%;
	list-style: none;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 0 0 20px 20px;
	background-color: #fff;
	z-index: 1;
`;

const HistoryItemStyle = styled.li`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	text-align: center;
	align-items: center;
	margin-bottom: 5px;
	position: relative;
	z-index: 1;
	color: #51474e;

	cursor: pointer;

	span {
		font-size: 14px;
		margin-bottom: 3px;
	}

	div {
		display: flex;
		flex-direction: column;
	}

	.url-label {
		font-size: 12px;
		color: #888;
		text-align: left;
	}

	div:last-child {
		display: flex;
		flex-direction: row;
	}

	${CopyButton}, ${DeleteButton} {
		font-size: 15px;
	}
`;

const truncateString = (str: string, maxLength: number): string => {
	if (str.length > maxLength) {
		return str.substring(0, maxLength) + '...';
	}
	return str;
};

interface HistoryListProps {
	historyList: (string | { originURL: string; shortenURL: string })[];
	handleCopyUrl: (url: string) => void;
	handleDelete: (index: number) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({
	historyList,
	handleCopyUrl,
	handleDelete,
}) => {
	return (
		<div>
			{historyList.length > 0 && (
				<HistoryListStyle>
					{historyList.map((item, index) => (
						<HistoryItemStyle key={index}>
							<div>
								<span className='url-label'>Original URL</span>
								<span>
									{typeof item === 'string'
										? truncateString(item, 16)
										: truncateString(item.originURL, 19)}
								</span>
							</div>
							<div>
								<span className='url-label'>Shorten URL</span>
								<span>{typeof item === 'string' ? item : item.shortenURL}</span>
							</div>
							<div>
								<CopyButton
									onClick={(e) => {
										handleCopyUrl(
											typeof item === 'string' ? item : item.shortenURL
										);
										e.stopPropagation();
									}}
								>
									Copy
								</CopyButton>
								<DeleteButton onClick={() => handleDelete(index)}>
									Delete
								</DeleteButton>
							</div>
						</HistoryItemStyle>
					))}
				</HistoryListStyle>
			)}
		</div>
	);
};

export default HistoryList;
