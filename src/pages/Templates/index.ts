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
			setLimit,
			setOffset,
		},
	}) => ({
		limit,
		loading,
		offset,
		setLimit,
		setOffset,
		templateDelete,
		templates,
		total,
		setSnackbar,
	}),
)(Templates);
