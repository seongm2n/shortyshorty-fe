import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { getApi } from '../config/axios';

interface RedirectComponentProps {
	key: string;
}

const RedirectComponent: React.FC<RedirectComponentProps> = ({ key }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRedirectData = async () => {
			try {
				const originalUrl = await getApi(key);
				navigate(originalUrl);
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
