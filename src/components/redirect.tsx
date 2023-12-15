import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const RedirectComponent = () => {
	const navigate = useNavigate();
  
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const key = urlParams.get('key');

		if (key) {
			navigate(`https://api.shortyshorty.site/${key}`);
		}
	}, [navigate]);

	return (
		<div>
			{/* 리다이렉션 중일 때 보여질 내용 */}
			Redirecting...
		</div>
	);
};

export default RedirectComponent;
