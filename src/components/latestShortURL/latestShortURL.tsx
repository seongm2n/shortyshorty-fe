import React from 'react';
import { CopyButton } from '../../styles/button';

interface LatestShortURLProps {
	latestShortURL: string;
	handleCopyUrl: (url: string) => void;
}

const LatestShortURLCopy: React.FC<LatestShortURLProps> = ({
	latestShortURL,
	handleCopyUrl,
}) => {
	return (
		<CopyButton onClick={() => handleCopyUrl(latestShortURL)}>Copy</CopyButton>
	);
};

export default LatestShortURLCopy;
