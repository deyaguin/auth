import { inject } from 'mobx-react';

import Users from './Users';

export default inject(({ snackbarStore: { onError } }) => ({ onError }))(Users);
