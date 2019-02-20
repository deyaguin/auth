import { observable } from 'mobx';

import Client from '../http';

class RegistryStore {
	@observable public a: string;

	constructor(client: Client) {
		this.a = 'a';
	}
}

export default RegistryStore;
