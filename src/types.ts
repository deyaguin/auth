export interface IUser {
	id: string;
	login: string;
	tag?: string;
	profile?: { [propName: string]: string };
	tasks?: ITask[];
}

export interface IAttribute {
	key: string;
	name: string;
	title: string;
	condition?: string;
	values?: string;
	operationId?: string;
	taskId?: string;
}

export interface IOperation {
	attributes: IAttribute[];
	id: string;
	name: string;
	taskId: string;
	selected?: boolean;
	state?: string;
}

export interface ITask {
	id: string;
	name: string;
	operations: IOperation[];
}

export interface ITemplate {
	id: string;
	name: string;
	tags?: string;
	comment?: string;
	tasks: ITask[];
}

export interface ITasks {
	[id: string]: ITask;
}

export interface IValues {
	[name: string]: any;
}

export interface IFilters {
	[name: string]: string;
}

export type SetLimit = (limit: number) => void;

export type SetOffset = (offset: number) => void;

export type TemplateCreate = (template: {
	name: string;
	tags: string;
	comment: string;
	tasks: ITasks;
}) => void;

export type TemplateEdit = (template: {
	id: string;
	name: string;
	tags: string;
	comment: string;
	tasks: ITasks;
}) => void;

export type SelectedItem = string | number;
