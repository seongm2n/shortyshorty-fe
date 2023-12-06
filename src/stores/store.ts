import { create } from 'zustand';
import { AppState, AppActions } from './types';

const useStore = create<AppState & AppActions>((set) => ({
	inputValue: '',
	historyList: [],
	latestShortURL: '',
	isSearchOpen: false,
	isCopied: false,
	validMessage: '',

	setInputValue: (value) => set({ inputValue: value }),
	setHistoryList: (list) => set({ historyList: list }),
	setLatestShortURL: (url) => set({ latestShortURL: url }),
	setIsSearchOpen: (isOpen) => set({ isSearchOpen: isOpen }),
	setIsCopied: (isCopied) => set({ isCopied: isCopied }),
	setValidMessage: (valid) => set({ validMessage: valid }),
}));

export default useStore;
