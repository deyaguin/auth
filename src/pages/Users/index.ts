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
			clearFilters,
			userDelete,
			setLimit,
			setOffset,
		},
	}) => ({
		clearFilters,
		filters,
		limit,
		loading,
		offset,
		setSnackbar,
		total,
		userDelete,
		users,
		usersList,
		setLimit,
		setOffset,
	}),
)(Users);
