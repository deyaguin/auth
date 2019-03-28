import { observable, action, computed, toJS } from 'mobx';

import Store from './Store';
import { Services } from '../services';
import IFiltersStore from './Interfaces/FiltersStore';
import Task from './Models/Task';

const TASKS = {
	'1': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '1',
	}),
	'2': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '2',
	}),
	'3': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '3',
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

	@action public setFilters = (filters: IFilters) => {
		this.filtersMap = { ...this.filtersMap, ...filters };
	};

	@action public clearFilters = () => {
		this.filtersMap = {};
	};

	@computed public get tasks(): Task[] {
		return Object.values(toJS(this.tasksMap));
	}

	@computed public get filters(): IFilters {
		return toJS(this.filtersMap);
	}
}

export default TasksStore;
