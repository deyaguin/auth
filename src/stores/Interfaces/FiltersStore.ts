interface IFiltersStore {
	filters: { [name: string]: string };
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
}

export default IFiltersStore;
