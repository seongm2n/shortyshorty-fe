import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const RedirectComponent = () => {
	const navigate = useNavigate();
	const { key } = useParams();
  
	useEffect(() => {
    console.log(key)
    if (key) {
			navigate(`https://api.shortyshorty.site/${key}`, { replace: true });
		}
	}, [key, navigate]);

	return (
		<div>
			Redirecting...
		</div>
	);
};

export default RedirectComponent;
