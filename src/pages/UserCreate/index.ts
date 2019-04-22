import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

import UserCreate from './UserCreate';

export default inject(
	({
		templatesStore: {
			clearFilters,
			setFilters,
			templates,
			filters,
			limit,
			setLimit,
			setOffset,
			offset,
			total,
			setSelectedItems,
			clearSelectedItems,
			selectionsCount,
			pageSelections,
		},
		snackbarStore: { setSnackbar },
	}) => ({
		clearFilters,
		clearSelectedItems,
		filters,
		limit,
		offset,
		pageSelections,
		selectionsCount,
		setFilters,
		setLimit,
		setOffset,
		setSelectedItems,
		setSnackbar,
		templates,
		total,
	}),
)(withRouter(UserCreate));
