import IOperation from './Operation';

interface ITask {
	task_id: string;
	name: string;
	operations: IOperation[];
}

export default ITask;
