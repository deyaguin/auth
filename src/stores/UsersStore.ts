import { observable, computed, action, toJS } from 'mobx';

import Store from './Store';
import { Services } from '../services';
import UserModel from './Models/User';
import User from './Interfaces/User';

class UsersStore extends Store {
	@observable private usersArray: UserModel[];
	@observable private limit: number;
	@observable private offset: number;
	@observable private loading: boolean;

	constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.limit = 10;
		this.offset = 0;
		this.loading = false;
		this.usersArray = [];

		this.services.authentication.subscriptions.usersList.subscribe({
			next: async (response: any) => {
				const { result } = response;

				await result.forEach((item: User) => {
					const user = new UserModel(item.login);

					this.usersArray.push(user);
				});

				this.setLoading(false);
			},
			error: (e: any) => console.log(e),
		});

		services.authentication.requests.usersList({}, () => this.setLoading(true));
	}

	@action private setLoading = (loading: boolean) => {
		this.loading = loading;
	};

	@action private setLimit = (limit: number) => {
		this.limit = limit;
	};

	@action private setOffset = (offset: number) => {
		this.offset = offset;
	};

	@computed private get users() {
		return toJS(this.usersArray);
	}
}

export default UsersStore;
