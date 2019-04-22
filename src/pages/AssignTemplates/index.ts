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
			setSelectedItems,
			clearSelectedItems,
			selectionsCount,
			pageSelections,
		},
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
		templates,
		total,
	}),
)(AssignTemplates);
