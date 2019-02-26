import { observable } from 'mobx';

import { Services } from '../services';

class RegistryStore {
	@observable public a: string;

	constructor(services: Services) {
		this.a = 'a';
	}
}

export default RegistryStore;
