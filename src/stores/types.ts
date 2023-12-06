export interface AppState {
	inputValue: string;
	historyList: string[];
	latestShortURL: string;
	isSearchOpen: boolean;
	isCopied: boolean;
}

export interface AppActions {
	setInputValue: (value: string) => void;
	setHistoryList: (list: string[]) => void;
	setLatestShortURL: (url: string) => void;
	setIsSearchOpen: (isOpen: boolean) => void;
	setIsCopied: (isCopied: boolean) => void;
}
