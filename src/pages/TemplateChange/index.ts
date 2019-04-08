import { inject } from 'mobx-react';
import { withRouter } from 'react-router';

import TemplateChange from './TemplateChange';

export default inject(
	({ templatesStore: { templateCreate, templateEdit, getTemplate }, tasksStore: { tasks } }) => ({
		getTemplate,
		tasks,
		templateCreate,
		templateEdit,
	}),
)(withRouter(TemplateChange));
