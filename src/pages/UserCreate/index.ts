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
		},
		snackbarStore: { setSnackbar },
	}) => ({
		clearFilters,
		filters,
		limit,
		offset,
		setFilters,
		setLimit,
		setOffset,
		setSnackbar,
		templates,
		total,
	}),
)(withRouter(UserCreate));
