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
		{
			user_id: '1',
			login: 'TEST',
			tasks: [
				{
					name: 'Работа с заявками',
					operations: [
						{
							attributes: [
								{ key: 'organitzation_id', title: 'Организация', name: '' },
								{ key: 'personal_account_id', title: 'Лицевой счет', name: '' },
								{ key: 'district_id', title: 'Район', name: '' },
							],
							name: 'Обновление заявки',
							operation_id: '1',
						},
						{
							attributes: [
								{ key: 'organitzation_id', title: 'Организация', name: '' },
								{ key: 'personal_account_id', title: 'Лицевой счет', name: '' },
								{ key: 'district_id', title: 'Район', name: '' },
							],
							name: 'Создание заявки',
							operation_id: '2',
						},
						{ operation_id: '3', name: 'Список заявок', attributes: [] },
					],
					task_id: '2',
				},
			],
		},
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'2': new User(
		{ user_id: '2', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'3': new User(
		{ user_id: '3', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'4': new User(
		{ user_id: '4', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'5': new User(
		{ user_id: '5', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'6': new User(
		{ user_id: '6', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'7': new User(
		{ user_id: '7', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'8': new User(
		{ user_id: '8', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'9': new User(
		{ user_id: '9', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'10': new User(
		{ user_id: '10', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'11': new User(
		{ user_id: '11', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'12': new User(
		{ user_id: '12', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'13': new User(
		{ user_id: '13', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'14': new User(
		{ user_id: '14', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'15': new User(
		{ user_id: '15', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'16': new User(
		{ user_id: '16', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'17': new User(
		{ user_id: '17', login: 'TEST' },
		{ name: 'test', address: 'test', personalAccount: 'test', organization: 'test', email: 'test' },
	),
	'18': new User(
		{ user_id: '18', login: 'TEST' },
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
		this.limit = 20;
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

	@action public getUser = (id: string): User => {
		return toJS(this.usersMap[id]);
	};

	@computed public get users() {
		return Object.values(toJS(this.usersMap))
			.map((item: User) => {
				if (item.profile) {
					return {
						id: item.id,
						login: item.login,
						...item.profile,
					};
				}

				return item;
			})
			.slice(this.offset, this.offset + this.limit);
	}

	@computed public get filters(): IFilters {
		return toJS(this.filtersMap);
	}

	@computed public get total(): number {
		return Object.keys(USERS).length;
	}
}

export default UsersStore;
