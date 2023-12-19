import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApi } from '../config/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageMoving from './pageMoving';

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
					toast.error('shortUrl로 이동한 Key가 없어요');
					setLoading(false);
				}
			} catch (error) {
				toast.error('유효한 shortUrl로 이동하세요');
				setLoading(false);
			}
		};
		fetchRedirectData();
	}, [key]);

	return (
		<div>
			{loading && <PageMoving/>}
			<ToastContainer position="top-center" />
		</div>
	);
};

export default RedirectComponent;
