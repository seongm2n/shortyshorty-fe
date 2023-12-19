import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const apiError = (error: any) => {
	console.error('API 에러:', error); // 추가된 부분
	if (is502Error(error)) {
		toast.error('502 Bad Gateway');
	} else if (is500Error(error)) {
		toast.error('500 Internal Server Error');
	} else if (is404Error(error)) {
		toast.error('404 페이지를 찾을 수 없어요!');
	} else if (isTimeoutError(error)) {
		toast.error('서버 응답 시간이 초과되었습니다.');
	} else {
		toast.error('알 수 없는 에러 발생');
	}
};

export const is404Error = (error: any): boolean => {
	return error.isAxiosError && (error as AxiosError).response?.status === 404;
};

export const is500Error = (error: any): boolean => {
	return error.isAxiosError && (error as AxiosError).response?.status === 500;
};

export const is502Error = (error: any): boolean => {
	return error.isAxiosError && (error as AxiosError).response?.status === 502;
};

export const isTimeoutError = (error: any): boolean => {
	return error.isAxiosError && error.code === 'ECONNABORTED';
};
