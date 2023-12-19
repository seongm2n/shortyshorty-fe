import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const apiError = (error: any) => {
	if (is502Error(error)) {
		toast.error('502 데이터베이스 고치는중~');
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

export const isTimeoutError = (error: any): boolean => {
	return error.isAxiosError && error.code === 'ECONNABORTED';
};

export const is502Error = (error: any): boolean => {
	return error.isAxiosError && (error as AxiosError).response?.status === 502;
};