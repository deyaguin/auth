import { observable, action, computed, toJS } from 'mobx';

import Store from './Store';
import { Services } from '../services';
import IFiltersStore from './Interfaces/FiltersStore';
import Task from './Models/Task';

const TASKS = {
	'1': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов', attributes: [] },
			{ operation_id: '2', name: 'Выгрузка отчетов', attributes: [] },
		],
		task_id: '1',
	}),
	'2': new Task({
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
	}),
};

interface IFilters {
	[name: string]: string;
}

class TasksStore extends Store implements IFiltersStore {
	@observable public filtersMap: IFilters;
	@observable private tasksMap: { [id: string]: Task };

	public constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.tasksMap = TASKS;
		this.filtersMap = {};
	}

	@action public setFilters = (filters: IFilters): void => {
		this.filtersMap = { ...this.filtersMap, ...filters };
	};

	@action public clearFilters = (): void => {
		this.filtersMap = {};
	};

	@computed public get tasks(): Task[] {
		return Object.values(toJS(this.tasksMap));
	}

	@computed public get filters(): IFilters {
		return toJS(this.filtersMap);
	}

	@computed public get total(): number {
		return Object.keys(TASKS).length;
	}
}

export default TasksStore;
