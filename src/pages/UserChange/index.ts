import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

import UserChange from './UserChange';

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
	}) => ({
		clearFilters,
		filters,
		limit,
		offset,
		setFilters,
		setLimit,
		setOffset,
		templates,
		total,
	}),
)(withRouter(UserChange));
