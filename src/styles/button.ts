import styled from 'styled-components';

export const DeleteButton = styled.button`
	background-color: #fffcfc;
	color: #d9967e;
	border: 1px solid #d9967e;
	border-radius: 20px;
	padding: 8px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	cursor: pointer;
`;

export const CopyButton = styled.button`
	background-color: #fffcfc;
	color: #d9967e;
	border: 1px solid #d9967e;
	border-radius: 20px;
	padding: 8px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin-right: 5px;
	cursor: pointer;

	&:hover {
		background-color: #b5645a;
	}
`;

export const ShortenButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 0;
	padding: 8px;
	margin-right: 10px;
	background-color: #d9967e;
	color: #f2f2eb;
	border: 1px solid #d9967e;
	border-radius: 15px;
	font-size: 16px;
	cursor: pointer;

	&:hover {
		background-color: #b5645a;
	}

	@media (max-width: 768px) {
	}
`;
