export interface AppState {
	inputValue: string;
	historyList: (string | { originURL: string; shortenURL: string })[];
	latestShortURL: string;
	isSearchOpen: boolean;
}

export interface AppActions {
	setInputValue: (value: string) => void;
	setHistoryList: (list: string[]) => void;
	setLatestShortURL: (url: string) => void;
	setIsSearchOpen: (isOpen: boolean) => void;
}
