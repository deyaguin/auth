import { inject } from 'mobx-react';

import ConflictResolution from './ConflictResolution';

export default inject(
	({ usersStore: { selectedUsers, getUser, setSelectedUsers }, templatesStore: {} }) => ({
		getUser,
		selectedUsers,
		setSelectedUsers,
	}),
)(ConflictResolution);
