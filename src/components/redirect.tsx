import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const RedirectComponent = () => {
	const navigate = useNavigate();
  
	useEffect(() => {
		const currentPath = window.location.pathname;
		const key = currentPath.substring(1); 
    console.log(currentPath, key);

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
