import { observable } from 'mobx';
import Store from './Store';
import { Services } from '../services';

class UsersStore extends Store {
	constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.services.authentication.subscriptions.usersList.subscribe({
			next: (r: any) => console.log(r),
			error: (e: any) => console.log(e),
		});

		services.authentication.requests.usersList();
		services.authentication.requests.usersList();
		services.authentication.requests.usersList();
	}
}

export default UsersStore;
