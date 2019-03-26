import { inject } from 'mobx-react';

import Templates from './Templates';

export default inject(
	({
		snackbarStore: { onError },
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
		onError,
		setLimit,
		setOffset,
		templateDelete,
		templates,
		total,
	}),
)(Templates);
