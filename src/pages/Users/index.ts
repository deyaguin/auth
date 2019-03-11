import { inject } from 'mobx-react';

import Users from './Users';

export default inject(({ snackbarStore: { onError }, usersStore: { users, loading } }) => ({
	loading,
	onError,
	users,
}))(Users);
