import { observable } from 'mobx';

import Store from './Store';
import { Services } from '../services';

class UsersStore extends Store {
	@observable public a: string;

	constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		services.authentication.requests.usersList().subscribe({
			error: (e: any) => setSnackbar(e.toString(), 'error'),
			next: (data: any) => console.log(data),
		});

		this.a = 'a';
	}
}

export default UsersStore;
