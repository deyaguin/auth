import { inject } from 'mobx-react';

import TemplateCreate from './TemplateCreate';

export default inject(({ templatesStore: { templateCreate }, tasksStore: { tasks } }) => ({
	tasks,
	templateCreate,
}))(TemplateCreate);
