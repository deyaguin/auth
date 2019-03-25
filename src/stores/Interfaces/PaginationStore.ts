interface IPaginationStore {
	limit: number;
	offset: number;
	setLimit: (limit: number) => void;
	setOffset: (offser: number) => void;
}

export default IPaginationStore;
