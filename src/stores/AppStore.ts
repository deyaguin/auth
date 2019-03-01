import { observable, action } from 'mobx';

import Store from './Store';
import { Services } from '../services';

class AppStore extends Store {
	constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);
		this.services = services;
	}

	@action
	public auth = () => {};
}

export default AppStore;
