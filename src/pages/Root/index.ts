import { observer, inject } from 'mobx-react';

import Root from './Root';

export default inject(
	({
		appStore: { drawerOpen, setDrawerOpen },
		snackbarStore: { open, message, type, onClose, onAction },
	}) => ({
		drawerOpen,
		setDrawerOpen,
		snackbarOptions: { open, message, type, onClose, onAction },
	}),
)(observer(Root));
