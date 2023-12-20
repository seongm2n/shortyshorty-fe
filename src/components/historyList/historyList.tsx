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

	span {
		font-size: 14px;
		margin-bottom: 3px;
	}

	div {
		display: flex;
		flex-direction: column;
	}

	.d {
		width: 16%;
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
		font-size: 13px;
	}

	${CopyButton} {
		margin-right: 5px;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;

		div {
			margin-bottom: 3px;
		}

		div:last-child {
			flex-direction: row;
		}

		${CopyButton}, ${DeleteButton} {
			font-size: 13px;
		}

		span {
			font-size: 13px;
		}

		.url-label {
			font-size: 11px;
			color: #888;
			text-align: left;
		}

		.d {
		width: 30%;
	}
	}
`;

const truncateString = (str: string, maxLength: number): string => {
	const ellipsis = '...';
	const strLength = str.length;

	if (strLength > maxLength) {
		return str.substring(0, maxLength - ellipsis.length) + ellipsis;
	} else if (strLength < maxLength) {
		const padding = ' '.repeat(maxLength - strLength);
		return str + padding;
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
	const isMobile = window.innerWidth <= 768;
	const maxItemsToShow = isMobile ? 2 : 10;
	const truncatedList = historyList.slice(0, maxItemsToShow);
	return (
		<div>
			{historyList.length > 0 && (
				<HistoryListStyle>
					{truncatedList.map((item, index) => (
						<HistoryItemStyle key={index}>
							<div className='d'>
								<span className='url-label'>Original URL</span>
								<span>
									{typeof item === 'string'
										? truncateString(item, 30)
										: truncateString(item.originURL, 28)}
								</span>
							</div>
							<div className='d'>
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
