import { inject } from 'mobx-react';

import ConflictResolution from './ConflictResolution';

export default inject(
	({
		usersStore: { selectedUsers, getUser, setSelectedUsers },
		templatesStore: { selectedTemplates, getTemplate, setSelectedTemplates },
	}) => ({
		getTemplate,
		getUser,
		selectedTemplates,
		selectedUsers,
		setSelectedTemplates,
		setSelectedUsers,
	}),
)(ConflictResolution);
