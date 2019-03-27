interface IFiltersStore {
	filters: { [name: string]: number | boolean | string };
	setFilters: (filters: { [name: string]: number | boolean | string }) => void;
	clearFilters: () => void;
}

export default IFiltersStore;
