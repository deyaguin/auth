import { observable, action } from 'mobx';

import Client, { queries } from '../http';

class AppStore {
	@observable private http: Client;

	constructor(client: Client) {
		this.http = client;
	}

	@action
	public auth = () => {
		queries.auth().subscribe({ next: (data: any) => console.log(data) });
	};
}

export default AppStore;
