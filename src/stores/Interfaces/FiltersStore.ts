interface IFiltersStore {
	filters: { [name: string]: any };
	setFilters: (filters: { [name: string]: any }) => void;
	clearFilters: () => void;
}

export default IFiltersStore;
