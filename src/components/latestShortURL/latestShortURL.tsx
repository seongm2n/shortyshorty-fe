import React from 'react';
import { CopyButton } from '../../styles/button';

interface LatestShortURLProps {
	latestShortURL: string;
	handleCopyUrl: (url: string) => void;
	isCopied: boolean;
}

const LatestShortURL: React.FC<LatestShortURLProps> = ({
	latestShortURL,
	handleCopyUrl,
	isCopied,
}) => {
	return (
		<CopyButton
			onClick={() => handleCopyUrl(latestShortURL)}
			disabled={isCopied}
		>
			Copy
		</CopyButton>
	);
};

export default LatestShortURL;
