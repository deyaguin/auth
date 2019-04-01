import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

import TemplateChange from './TemplateChange';

export default inject(
	({ templatesStore: { templateCreate, getTemplate }, tasksStore: { tasks } }) => ({
		getTemplate,
		tasks,
		templateCreate,
	}),
)(withRouter(TemplateChange));
