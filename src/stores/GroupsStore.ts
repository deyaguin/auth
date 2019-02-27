import { observable } from 'mobx';

import Store from './Store';
import { Services } from '../services';

class GroupsStore extends Store {
	@observable public a: string;

	constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);
		this.a = 'a';
	}
}

export default GroupsStore;
