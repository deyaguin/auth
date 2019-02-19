import { observable } from 'mobx';

import Client from '../http';

class UsersStore {
	@observable public a: string;

	constructor(client: Client) {
		this.a = 'a';
	}
}

export default UsersStore;
