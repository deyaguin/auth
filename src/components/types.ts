export interface IAttribute {
	key: string;
	name: string;
	title: string;
	condition?: string;
	values?: string;
}

export interface IOperation {
	id: string;
	name: string;
	taskId: string;
	selected?: boolean;
	state?: string;
	attributes: IAttribute[];
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

export type SetValue = (key: string, value: any) => void;

export type SetError = (key: string, value: boolean) => void;
