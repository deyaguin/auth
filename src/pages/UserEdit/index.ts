import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

import UserEdit from './UserEdit';

export default inject(
	({
		usersStore: { getUser },
		snackbarStore: { setSnackbar },
		restrictionsEditorStore: { tasks: selectedTasks, setTasks, clear: clearRestrictionsEditor },
	}) => ({
		clearRestrictionsEditor,
		getUser,
		selectedTasks,
		setSnackbar,
		setTasks,
	}),
)(withRouter(UserEdit));
