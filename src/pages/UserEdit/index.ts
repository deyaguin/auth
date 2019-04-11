import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

import UserEdit from './UserEdit';

export default inject(({ usersStore: { getUser }, snackbarStore: { setSnackbar } }) => ({
	getUser,
	setSnackbar,
}))(withRouter(UserEdit));
