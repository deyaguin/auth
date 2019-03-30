export interface ITask {
	id: string;
	name: string;
	operations: Array<{ id: string; name: string; taskId: string }>;
}
