import { inject } from 'mobx-react';

import Templates from './Templates';

export default inject(
	({
		snackbarStore: { setSnackbar },
		templatesStore: {
			templates,
			loading,
			templateDelete,
			limit,
			offset,
			total,
			filters,
			setLimit,
			setOffset,
			clearFilters,
			setFilters,
		},
	}) => ({
		clearFilters,
		filters,
		limit,
		loading,
		offset,
		setFilters,
		setLimit,
		setOffset,
		setSnackbar,
		templateDelete,
		templates,
		total,
	}),
)(Templates);
