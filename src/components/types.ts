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
