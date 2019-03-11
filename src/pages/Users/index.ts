import { inject } from 'mobx-react';

import Users from './Users';

export default inject(
	({ snackbarStore: { onError }, usersStore: { users, loading, usersList } }) => ({
		loading,
		onError,
		users,
		usersList,
	}),
)(Users);
