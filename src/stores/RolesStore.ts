import { observable } from 'mobx';

import { Services } from '../services';

class RolesStore {
	@observable public a: string;

	constructor(services: Services) {
		this.a = 'a';
	}
}

export default RolesStore;
