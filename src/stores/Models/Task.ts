import ITask from '../Interfaces/Task';
import IOperation from '../Interfaces/Operation';
import Operation from './Operation';

class Task {
	public id: string;
	public name: string;
	public operations: Operation[];

	public constructor(task: ITask) {
		this.id = task.task_id;
		this.name = task.name;
		this.operations = task.operations.map((item: IOperation) => new Operation(item, task.task_id));
	}
}

export default Task;
