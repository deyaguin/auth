import { observable } from 'mobx';

import Client from '../http';

class GroupsStore {
	@observable public a: string;

	constructor(client: Client) {
		this.a = 'a';
	}
}

export default GroupsStore;
