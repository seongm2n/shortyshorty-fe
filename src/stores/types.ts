export interface AppState {
	inputValue: string;
	historyList: (string | { originURL: string; shortenURL: string })[];
	latestShortURL: string;
	isSearchOpen: boolean;
	isCopied: boolean;
	validMessage: string;
	// key: string;
}

export interface AppActions {
	setInputValue: (value: string) => void;
	setHistoryList: (list: string[]) => void;
	setLatestShortURL: (url: string) => void;
	setIsSearchOpen: (isOpen: boolean) => void;
	setIsCopied: (isCopied: boolean) => void;
	setValidMessage: (valid: string) => void;
	// setKey: (key: string) => void;
}
