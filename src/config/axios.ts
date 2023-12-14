import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
	baseURL: apiUrl,
});

export const postApi = async (url: string): Promise<string> => {
	try {
		const response = await instance.post(`/?url=${url}`);
		const { data } = response.data;
		return data;
	} catch (err) {
		console.error('API 호출 실패', err);
		throw err;
	}
};
