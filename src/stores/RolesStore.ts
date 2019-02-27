import { observable } from 'mobx';

import Store from './Store';
import { Services } from '../services';

class RolesStore extends Store {
	@observable public a: string;

	constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);
		this.a = 'a';
	}
}

export default RolesStore;
