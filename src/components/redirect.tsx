import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const RedirectComponent = () => {
	const navigate = useNavigate();
	const { key } = useParams();

	useEffect(() => {
		if (key) {
			navigate(`https://api.shortyshorty.site/${key}`, { replace: true });
		}
	}, [key, navigate]);

	return (
		<div>
			{/* 리다이렉션 중일 때 보여질 내용 */}
			Redirecting...
		</div>
	);
};

export default RedirectComponent;
