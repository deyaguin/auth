import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

import RestrictionsEditor from './RestrictionsEditor';

export default inject(
	({ restrictionsEditorStore: { setTasks, tasks: selectedTasks }, tasksStore: { tasks } }) => ({
		selectedTasks,
		setTasks,
		tasks,
	}),
)(withRouter(RestrictionsEditor));
