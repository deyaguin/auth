import { observer, inject } from 'mobx-react';

import Root from './Root';

export default inject(({ snackbarStore: { open, message, type, onClose, onAction } }) => ({
	snackbarOptions: { open, message, type, onClose, onAction },
}))(observer(Root));
