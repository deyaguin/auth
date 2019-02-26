import { observable, action } from 'mobx';

import { Services } from '../services';

class AppStore {
	@observable private services: Services;

	constructor(services: Services) {
		this.services = services;
	}

	@action
	public auth = () => {
		// queries.auth().subscribe({ next: (data: any) => console.log(data) });
	};
}

export default AppStore;
