import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApi } from '../config/axios';

const RedirectComponent = () => {
	const navigate = useNavigate();
	const { key } = useParams<{ key?: string }>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRedirectData = async () => {
			try {
        if (key) {
          const originalUrl = await getApi(key);
          console.log(originalUrl);
					navigate(originalUrl);
				} else {
					console.error('Key is undefined or null');
				}
			} catch (error) {
				console.error('Failed to get original URL', error);
			} finally {
				setLoading(false);
			}
		};
		fetchRedirectData();
	}, [key, navigate]);

	return <div>{loading && <p>Loading...</p>}</div>;
};

export default RedirectComponent;
