import { withRouter } from 'react-router';
import { inject } from 'mobx-react';

import Template from './Template';

export default inject(({ templatesStore: { getTemplate } }) => ({ getTemplate }))(
	withRouter(Template),
);
