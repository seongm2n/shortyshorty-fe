import React from 'react';
import styled from 'styled-components';
import { CopyButton, DeleteButton } from '../../styles/button';

const HistoryListStyle = styled.ul`
	position: absolute;
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
	cursor: pointer;
`;

interface HistoryListProps {
	historyList: (string | { originURL: string; shortenURL: string })[];
	handleCopyUrl: (url: string) => void;
	handleDelete: (index: number) => void;
	isCopied: boolean;
}

const HistoryList: React.FC<HistoryListProps> = ({
	historyList,
	handleCopyUrl,
	handleDelete,
	isCopied,
}) => {
	return (
		<div>
			{historyList.length > 0 && (
				<HistoryListStyle>
					{historyList.map((item, index) => (
						<HistoryItemStyle key={index}>
							<span>{typeof item === 'string' ? item : item.originURL} </span>
							<span>{typeof item === 'string' ? item : item.shortenURL}</span>
							<div>
								<CopyButton
									onClick={() =>
										handleCopyUrl(
											typeof item === 'string' ? item : item.shortenURL
										)
									}
									disabled={isCopied}
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
