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
	'4': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '4',
	}),
	'5': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '5',
	}),
	'6': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '6',
	}),
	'7': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '7',
	}),
	'8': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '8',
	}),
	'9': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '9',
	}),
	'10': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '10',
	}),
	'11': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '11',
	}),
	'12': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '12',
	}),
	'13': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '13',
	}),
	'14': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '14',
	}),
	'15': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '15',
	}),
	'16': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '16',
	}),
	'17': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '17',
	}),
	'18': new Task({
		name: 'Отчеты',
		operations: [
			{ operation_id: '1', name: 'Просмотр отчетов' },
			{ operation_id: '2', name: 'Выгрузка отчетов' },
		],
		task_id: '18',
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
