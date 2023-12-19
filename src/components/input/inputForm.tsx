import React from 'react';
import { Input } from '../../styles/input';

interface InputFormProps {
	inputValue: string;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus: () => void;
	isSearchOpen: boolean;
	historyList: (string | { originURL: string; shortenURL: string })[];
}

const InputForm: React.FC<InputFormProps> = ({
	inputValue,
	onInputChange,
	onFocus,
	isSearchOpen,
	historyList,
}) => {
	return (
		<Input
			type='text'
			placeholder='Example: https://your-link.com/'
			value={inputValue}
			onChange={onInputChange}
			onFocus={onFocus}
			style={{
				borderRadius:
					isSearchOpen && historyList.length > 0 ? '20px 20px 0 0' : '20px',
				borderBottom:
					isSearchOpen && historyList.length > 0 ? 'none' : '1px solid #ccc',
			}}
		/>
	);
};

export default InputForm;
