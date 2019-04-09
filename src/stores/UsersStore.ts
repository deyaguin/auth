import { observable, computed, action, toJS } from 'mobx';

import Store from './Store';
import { Services } from '../services';
import User from './Models/User';
import IUser from './Interfaces/User';
import ILoadingStore from './Interfaces/LoadingStore';
import IPagintaionStore from './Interfaces/PaginationStore';
import IFiltersStore from './Interfaces/FiltersStore';

const USERS = {
	'1': new User(
		{ user_id: '1', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
};

interface IFilters {
	[name: string]: string;
}

class UsersStore extends Store implements ILoadingStore, IPagintaionStore, IFiltersStore {
	@observable public loading: boolean;
	@observable public limit: number;
	@observable public offset: number;
	@observable public filtersMap: IFilters;
	@observable private usersMap: { [id: string]: User };

	public constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.usersMap = USERS;
		this.loading = false;
		this.limit = 10;
		this.offset = 0;
		this.filtersMap = {};

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

	@action public userDelete = (id: string) => {};

	@action public setFilters = (filters: IFilters): void => {
		this.filtersMap = filters;
	};

	@action public clearFilters = (): void => {
		this.filtersMap = {};
	};

	@computed public get filters(): IFilters {
		return toJS(this.filtersMap);
	}

	@computed public get users() {
		return Object.values(toJS(this.usersMap)).map((item: User) => {
			if (item.profile) {
				return {
					id: item.id,
					login: item.login,
					...item.profile,
				};
			}

			return item;
		});
	}
}

export default UsersStore;
