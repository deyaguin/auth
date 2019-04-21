import { inject } from 'mobx-react';

import AssignTemplates from './AssignTemplates';

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
)(AssignTemplates);
