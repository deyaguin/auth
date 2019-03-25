import { observable, computed, action, toJS } from 'mobx';

import Store from './Store';
import { Services } from '../services';
import User from './Models/User';
import IUser from './Interfaces/User';
import ILoadingStore from './Interfaces/LoadingStore';
import IPagintaionStore from './Interfaces/PaginationStore';

class UsersStore extends Store implements ILoadingStore, IPagintaionStore {
	@observable public loading: boolean;
	@observable public limit: number;
	@observable public offset: number;
	@observable private usersMap: { [id: string]: User };

	public constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.usersMap = {};
		this.loading = false;
		this.limit = 10;
		this.offset = 0;

		// this.services.authentication.subscriptions.usersList.subscribe({
		// 	next: async (response: any) => {
		// 		const { result } = response;

		// 		this.setUsers(result).then(() => this.setLoading(false));
		// 	},
		// 	error: (e: any) => console.log(e),
		// });

		// services.authentication.requests.usersList({}, () => this.setLoading(true));
	}

	@action public setLoading = (loading: boolean) => {
		this.loading = loading;
	};

	@action public setLimit = (limit: number) => {
		this.limit = limit;
	};

	@action public setOffset = (offset: number) => {
		this.offset = offset;
	};

	@action public setUsers = async (values: IUser[]) => {
		const users = await values.reduce((acc: { [id: string]: User }, item: IUser) => {
			const user = new User(item);

			return { ...acc, [item.user_id]: user };
		}, {});

		this.usersMap = users;
	};

	@action public usersList = () => {
		this.services.authentication.requests.usersList({}, () => this.setLoading(true));
	};

	@action public userCreate = (values: any) => {
		// todo
	};

	@computed public get users() {
		return Object.values(toJS(this.usersMap));
	}
}

export default UsersStore;
