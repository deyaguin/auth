import { inject } from 'mobx-react';

import TemplateCreate from './TemplateCreate';

export default inject(({ templatesStore: { templateCreate } }) => ({ templateCreate }))(
	TemplateCreate,
);
