export interface IOperation {
	id: string;
	name: string;
	taskId: string;
	selected?: boolean;
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
