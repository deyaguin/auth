import { observable, action } from 'mobx';

import Store from './Store';
import { Services } from '../services';

class AppStore extends Store {
	@observable public drawerOpen: boolean;

	constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.services = services;
		this.drawerOpen = false;
	}

	@action public setDrawerOpen = (drawerOpen: boolean): void => {
		this.drawerOpen = drawerOpen;
	};

	@action
	public auth = () => {};
}

export default AppStore;
