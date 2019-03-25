import { inject } from 'mobx-react';

import Templates from './Templates';

export default inject(
	({ snackbarStore: { onError }, templatesStore: { templates, loading, templateDelete } }) => ({
		loading,
		onError,
		templateDelete,
		templates,
	}),
)(Templates);
