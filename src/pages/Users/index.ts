import { inject } from 'mobx-react';

import Users from './Users';

export default inject(
	({
		snackbarStore: { setSnackbar },
		usersStore: {
			users,
			loading,
			usersList,
			limit,
			offset,
			total,
			filters,
			pageSelections,
			selectionsCount,
			clearFilters,
			userDelete,
			setLimit,
			setOffset,
			setSelectedItems,
			clearSelectedItems,
		},
	}) => ({
		clearFilters,
		clearSelectedItems,
		filters,
		limit,
		loading,
		offset,
		pageSelections,
		selectionsCount,
		setLimit,
		setOffset,
		setSelectedItems,
		setSnackbar,
		total,
		userDelete,
		users,
		usersList,
	}),
)(Users);
