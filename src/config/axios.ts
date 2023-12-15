import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://api.shortyshorty.site',
	headers: {
		// 'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
	timeout: 10000,
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