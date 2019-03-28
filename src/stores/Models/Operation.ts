import IOpertaion from '../Interfaces/Operation';

class Operation {
	public id: string;
	public name: string;
	public taskId: string;

	public constructor(operation: IOpertaion, taskId: string) {
		this.id = operation.operation_id;
		this.name = operation.name;
		this.taskId = taskId;
	}
}

export default Operation;
