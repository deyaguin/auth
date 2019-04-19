import { observable, computed, action, toJS } from 'mobx';
import {
	map,
	slice,
	reduce,
	values,
	keys,
	compose,
	length,
	filter,
	insertAll,
	uniq,
	without,
} from 'ramda';

import Store from './Store';
import { Services } from '../services';
import User from './Models/User';
import IUser from './Interfaces/User';
import ILoadingStore from './Interfaces/LoadingStore';
import IPagintaionStore from './Interfaces/PaginationStore';
import IFiltersStore from './Interfaces/FiltersStore';
import ISelectionStore from './Interfaces/SelectionStore';
import { SelectedItem } from '../types';

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

interface IUsersMap {
	[id: string]: User;
}

interface IFilters {
	[name: string]: string;
}

class UsersStore extends Store
	implements ILoadingStore, IPagintaionStore, IFiltersStore, ISelectionStore {
	@observable public loading: boolean;
	@observable public limit: number;
	@observable public offset: number;
	@observable public filtersMap: IFilters;
	@observable public selectedItems: SelectedItem[];
	@observable private usersMap: IUsersMap;
	@observable private selectedUsers: string[];

	public constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.loading = false;
		this.limit = 5;
		this.offset = 0;
		this.filtersMap = {};
		this.selectedItems = [];
		this.selectedUsers = [];
		this.usersMap = this.getUsers(this.offset, this.limit)(USERS);

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

		this.offset = 0;

		this.usersMap = { ...this.usersMap, ...this.getUsers(this.offset, this.limit)(USERS) };
	};

	@action public setOffset = (offset: number) => {
		this.offset = offset;

		this.usersMap = { ...this.usersMap, ...this.getUsers(this.offset, this.limit)(USERS) };
	};

	@action public setUsers = (userValues: IUser[]) => {
		this.usersMap = reduce((acc, item: IUser) => ({ ...acc, [item.user_id]: new User(item) }), {})(
			userValues,
		);
	};

	@action public usersList = () => {
		this.services.authentication.requests.usersList({}, () => this.setLoading(true));
	};

	@action public userCreate = (creationValues: any) => {
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

	@action public setSelectedItems = (items: SelectedItem[]): void => {
		const currentPageUsers: string[] = compose(
			map<User, string>(item => item.id),
			slice(this.offset, this.offset + this.limit),
			values,
		)(toJS(this.usersMap));

		const currentPageSelections: SelectedItem[] = filter<SelectedItem>(
			(item: SelectedItem): boolean => item >= this.offset && item < this.offset + this.limit,
		)(this.selectedItems);

		this.selectedItems = compose(
			arr => uniq(arr),
			insertAll<SelectedItem>(
				this.selectedItems.length,
				map<SelectedItem, SelectedItem>(item => Number(item) + this.offset)(items),
			),
			without<SelectedItem>(currentPageSelections),
		)(this.selectedItems);

		this.selectedUsers = compose(
			arr => uniq(arr),
			insertAll<string>(
				this.selectedUsers.length,
				map<SelectedItem, string>(item => currentPageUsers[Number(item)])(items),
			),
			without<string>(currentPageUsers),
		)(toJS(this.selectedUsers));
	};

	@action public clearSelectedItems = (): void => {
		this.selectedItems = [];
		this.selectedUsers = [];
	};

	@computed public get users(): User[] {
		return compose(
			map<User, User>(item =>
				item.profile
					? {
							id: item.id,
							login: item.login,
							...item.profile,
					  }
					: item,
			),
			slice(this.offset, this.offset + this.limit),
			values,
		)(toJS(this.usersMap));
	}

	@computed public get filters(): IFilters {
		return toJS(this.filtersMap);
	}

	@computed public get total(): number {
		return Object.keys(USERS).length;
	}

	@computed public get pageSelections(): SelectedItem[] {
		const currentPage: number = this.offset / this.limit;

		return map<SelectedItem, number>(
			(item: SelectedItem) => Number(item) - this.limit * currentPage,
		)(
			filter<SelectedItem>(
				(item: SelectedItem) =>
					item >= this.limit * currentPage && item < this.limit * (currentPage + 1),
			)(this.selectedItems),
		);
	}

	@computed public get selectionsCount(): number {
		return this.selectedItems.length;
	}

	private getUsers = (offsetValue: number, limitValue: number) =>
		compose(
			reduce<User, IUsersMap>((acc, item) => ({ ...acc, [item.id]: item }), {}),
			slice(offsetValue, offsetValue + limitValue),
			values,
		);
}

export default UsersStore;
