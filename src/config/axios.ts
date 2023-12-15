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


// export const getApi = async (shortenedUrl: string): Promise<string> => {
// 	try {
// 		const shortCode = extractShortCode(shortenedUrl);
		
// 		const response = await instance.get(`/${shortCode}`);
// 		const { data } = response.data;
// 		return data; // 서버에서 받아온 Original Url 반환
// 	} catch (err) {
// 		console.log('Api 호출 실패', err);
// 		throw err;
// 	}
// };

// const extractShortCode = (url: string): string => {
// 	const parts = url.split('/');
// 	const shortCode = parts[parts.length - 1];

// 	return shortCode;
// };