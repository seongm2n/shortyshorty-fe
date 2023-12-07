import axios from 'axios';

interface FetchDataProps {
	inputValue: string;
}

const apiUrl = process.env.REACT_APP_API_URL;
// fetch(`${apiUrl}/shorten?url=${inputValue}`)

const fetchData = async ({ inputValue }: FetchDataProps) => {
	try {
		const response = await axios.get(`${apiUrl}/shorten?url=${inputValue}`);
		const data = response.data;
		return data.ShortenedUrl;
	} catch (err) {
		console.error('API 호출 실패', err);
	}
};

export default fetchData;
