import { observable } from 'mobx';

import { Services } from '../services';

class UsersStore {
	@observable public a: string;

	constructor(services: Services) {
		services.authentication.requests
			.usersList()
			.subscribe({ next: (data: any) => console.log(data), error: (e: any) => console.log(e) });
		this.a = 'a';
	}
}

export default UsersStore;
