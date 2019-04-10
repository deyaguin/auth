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

export interface IErrors {
	[name: string]: boolean;
}

export interface IFilters {
	[name: string]: string;
}

export type SetValue = (key: string, value: any) => void;

export type SetError = (key: string, value: boolean) => void;

export type SetLimit = (limit: number) => void;

export type SetOffset = (offset: number) => void;

export type TemplateCreate = (template: {
	name: string;
	tags: string;
	comment: string;
	tasks: ITasks;
}) => void;

export type TemplateUpdate = (template: {
	id: string;
	name: string;
	tags: string;
	comment: string;
	tasks: ITasks;
}) => void;

export type TemplateAction = (template: ITemplate) => void;
