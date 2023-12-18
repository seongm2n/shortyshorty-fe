import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApi } from '../config/axios';

const RedirectComponent = () => {
	const { key } = useParams<{ key?: string }>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRedirectData = async () => {
			try {
				if (key) {
					const originalUrl = await getApi(key);
					setLoading(false);
					window.location.href = originalUrl;
				} else {
					console.error('Key is undefined or null');
					setLoading(false);
				}
			} catch (error) {
				console.error('Failed to get original URL', error);
				setLoading(false);
			}
		};
		fetchRedirectData();
	}, [key]);

	return (
		<div>
			{loading && <p>페이지 이동중~~~</p>}
		</div>
	);
};

export default RedirectComponent;
