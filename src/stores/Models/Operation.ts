import IOpertaion from '../Interfaces/Operation';
import IAttribute from '../Interfaces/Attribute';

class Operation {
	public id: string;
	public name: string;
	public taskId: string;
	public attributes: IAttribute[];

	public constructor(operation: IOpertaion, taskId: string) {
		this.id = operation.operation_id;
		this.name = operation.name;
		this.taskId = taskId;
		this.attributes = operation.attributes;
	}
}

export default Operation;
