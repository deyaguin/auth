import { observable, computed, action, toJS } from 'mobx';

import Store from './Store';
import { Services } from '../services';
import User from './Models/User';
import IUser from './Interfaces/User';

class UsersStore extends Store {
	@observable private usersMap: { [id: string]: User };
	@observable private limit: number;
	@observable private offset: number;
	@observable private loading: boolean;

	constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.limit = 10;
		this.offset = 0;
		this.loading = false;
		this.usersMap = {};

		this.services.authentication.subscriptions.usersList.subscribe({
			next: async (response: any) => {
				const { result } = response;

				this.setUsers(result).then(() => this.setLoading(false));
			},
			error: (e: any) => console.log(e),
		});

		services.authentication.requests.usersList({}, () => this.setLoading(true));
	}

	@action private setUsers = async (values: IUser[]) => {
		const users = await values.reduce((acc: { [id: string]: User }, item: IUser) => {
			const user = new User(item);

			return { ...acc, [item.user_id]: user };
		}, {});

		this.usersMap = users;
	};

	@action private setLoading = (loading: boolean) => {
		this.loading = loading;
	};

	@action private setLimit = (limit: number) => {
		this.limit = limit;
	};

	@action private setOffset = (offset: number) => {
		this.offset = offset;
	};

	@action private usersList = () => {
		this.services.authentication.requests.usersList({}, () => this.setLoading(true));
	};

	@action private userCreate = (values: any) => {
		// todo
	};

	@computed private get users() {
		return Object.values(toJS(this.usersMap));
	}
}

export default UsersStore;
