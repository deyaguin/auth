import { observable } from 'mobx';

import ITask from '../Interfaces/Task';
import IOperation from '../Interfaces/Operation';
import Operation from './Operation';

class Task {
	@observable public id: string;
	@observable public name: string;
	@observable public operations: Operation[];

	public constructor(task: ITask) {
		this.id = task.task_id;
		this.name = task.name;
		this.operations = task.operations.map((item: IOperation) => new Operation(item, task.task_id));
	}
}

export default Task;
