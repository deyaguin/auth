import { observable } from 'mobx';

import Client from '../http';

class RolesStore {
	@observable public a: string;

	constructor(client: Client) {
		this.a = 'a';
	}
}

export default RolesStore;
