import { observable, action, computed, toJS } from 'mobx';
import { values, compose, slice, reduce, filter, map, insertAll, uniq, without } from 'ramda';

import Store from './Store';
import { Services } from '../services';
import Template from './Models/Template';
import ILoadingStore from './Interfaces/LoadingStore';
import IPagintaionStore from './Interfaces/PaginationStore';
import IFiltersStore from './Interfaces/FiltersStore';
import ISelectionStore from './Interfaces/SelectionStore';
import ITask from './Interfaces/Task';
import { SelectedItem } from '../types';

const TEMPLATES = {
	'1': new Template({
		template_id: '1',
		name: 'Диспетчер УК1',
		comment: 'test',
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
	}),
	'2': new Template({ template_id: '2', name: 'Диспетчер УК2', comment: 'test' }),
	'3': new Template({ template_id: '3', name: 'Диспетчер УК3', comment: 'test' }),
	'4': new Template({ template_id: '4', name: 'Диспетчер УК4', comment: 'test' }),
	'5': new Template({ template_id: '5', name: 'Диспетчер УК5', comment: 'test' }),
	'6': new Template({ template_id: '6', name: 'Диспетчер УК6', comment: 'test' }),
	'7': new Template({ template_id: '7', name: 'Диспетчер УК7', comment: 'test' }),
	'8': new Template({ template_id: '8', name: 'Диспетчер УК8', comment: 'test' }),
	'9': new Template({ template_id: '9', name: 'Диспетчер УК9', comment: 'test' }),
	'10': new Template({ template_id: '10', name: 'Диспетчер УК10', comment: 'test' }),
	'11': new Template({ template_id: '11', name: 'Диспетчер УК11', comment: 'test' }),
	'12': new Template({ template_id: '12', name: 'Диспетчер УК12', comment: 'test' }),
	'13': new Template({ template_id: '13', name: 'Диспетчер УК13', comment: 'test' }),
	'14': new Template({ template_id: '14', name: 'Диспетчер УК14', comment: 'test' }),
	'15': new Template({ template_id: '15', name: 'Диспетчер УК15', comment: 'test' }),
	'16': new Template({ template_id: '16', name: 'Диспетчер УК16', comment: 'test' }),
	'17': new Template({ template_id: '17', name: 'Диспетчер УК17', comment: 'test' }),
	'18': new Template({ template_id: '18', name: 'Диспетчер УК18', comment: 'test' }),
	'19': new Template({ template_id: '19', name: 'Диспетчер УК19', comment: 'test' }),
	'20': new Template({ template_id: '20', name: 'Диспетчер УК20', comment: 'test' }),
	'21': new Template({ template_id: '21', name: 'Диспетчер УК21', comment: 'test' }),
	'22': new Template({ template_id: '22', name: 'Диспетчер УК22', comment: 'test' }),
	'23': new Template({ template_id: '23', name: 'Диспетчер УК23', comment: 'test' }),
	'24': new Template({ template_id: '24', name: 'Диспетчер УК24', comment: 'test' }),
};

interface ITempaltesMap {
	[id: string]: Template;
}

interface IFilters {
	[name: string]: string;
}

class TemplatesStore extends Store
	implements ILoadingStore, IPagintaionStore, IFiltersStore, ISelectionStore {
	@observable public loading: boolean;
	@observable public limit: number;
	@observable public offset: number;
	@observable public filtersMap: IFilters;
	@observable public selectedItems: SelectedItem[];
	@observable private templatesMap: ITempaltesMap;
	@observable private selectedTemplatesArr: string[];

	public constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.loading = false;
		this.limit = 5;
		this.offset = 0;

		this.templatesMap = this.getTemplates(this.offset, this.limit)(TEMPLATES);
		this.selectedItems = [];
		this.selectedTemplatesArr = [];
		this.filtersMap = {};
	}

	@action public setLoading = (loading: boolean): void => {
		this.loading = loading;
	};

	@action public setLimit = (limit: number): void => {
		this.limit = limit;

		this.offset = 0;

		this.templatesMap = {
			...this.templatesMap,
			...this.getTemplates(this.offset, this.limit)(TEMPLATES),
		};
	};

	@action public setOffset = (offset: number): void => {
		this.offset = offset;

		this.templatesMap = {
			...this.templatesMap,
			...this.getTemplates(this.offset, this.limit)(TEMPLATES),
		};
	};

	@action public templateCreate = ({
		name,
		comment,
		tags,
		tasks,
	}: {
		name: string;
		comment?: string;
		tags?: string;
		tasks: { [id: string]: ITask };
	}): void => {
		const id = Object.keys(this.templatesMap).length.toString();

		this.templatesMap = {
			...this.templatesMap,
			[id]: new Template({ template_id: id, name, comment, tags }),
		};
	};

	@action public templateEdit = ({
		id,
		name,
		comment,
		tags,
	}: {
		id: string;
		name: string;
		comment?: string;
		tags?: string;
		tasks: { [id: string]: ITask };
	}): void => {
		this.templatesMap = {
			...this.templatesMap,
			[id]: new Template({ template_id: id, name, comment, tags }),
		};
	};

	@action public templateDelete = (id: string): void => {
		delete this.templatesMap[id];
	};

	@action public setFilters = (filters: IFilters): void => {
		this.filtersMap = filters;
	};

	@action public clearFilters = (): void => {
		this.filtersMap = {};
	};

	@action public getTemplate = (id: string): Template => {
		return toJS(this.templatesMap[id]);
	};

	@action public setSelectedItems = (items: SelectedItem[]): void => {
		const currentPageTemplates: string[] = compose(
			map<Template, string>(item => item.id),
			slice(this.offset, this.offset + this.limit),
			values,
		)(toJS(this.templatesMap));

		this.selectedItems = without<SelectedItem>(
			this.selectedItems,
			map((item: SelectedItem) => Number(item) + this.offset, items),
		);

		this.selectedTemplatesArr = [currentPageTemplates[Number(this.selectedItems[0])]];
	};

	@action public clearSelectedItems = (): void => {
		this.selectedItems = [];
		this.selectedTemplatesArr = [];
	};

	@computed public get templates(): Template[] {
		return slice<Template>(this.offset, this.offset + this.limit, values(toJS(this.templatesMap)));
	}

	@computed public get filters(): IFilters {
		return toJS(this.filtersMap);
	}

	@computed public get total(): number {
		return Object.keys(TEMPLATES).length;
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

	@computed public get selectedTemplates(): string[] {
		return toJS(this.selectedTemplatesArr);
	}

	private getTemplates = (offsetValue: number, limitValue: number) =>
		compose(
			reduce<Template, ITempaltesMap>((acc, item) => ({ ...acc, [item.id]: item }), {}),
			slice(offsetValue, offsetValue + limitValue),
			values,
		);
}

export default TemplatesStore;
