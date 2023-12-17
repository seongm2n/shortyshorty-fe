import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApi } from '../config/axios';

const RedirectComponent = () => {
	const { key } = useParams<{ key?: string }>();

	useEffect(() => {
		const fetchRedirectData = async () => {
			try {
				if (key) {
					const originalUrl = await getApi(key);

					window.location.href = originalUrl;
				} else {
					console.error('Key is undefined or null');
				}
			} catch (error) {
				console.error('Failed to get original URL', error);
			}
		};
		fetchRedirectData();
	}, [key]);

	return null;
};

export default RedirectComponent;
