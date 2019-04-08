import { observable } from 'mobx';

import IOpertaion from '../Interfaces/Operation';
import IAttribute from '../Interfaces/Attribute';

class Operation {
	@observable public id: string;
	@observable public name: string;
	@observable public taskId: string;
	@observable public attributes: IAttribute[];

	public constructor(operation: IOpertaion, taskId: string) {
		this.id = operation.operation_id;
		this.name = operation.name;
		this.taskId = taskId;
		this.attributes = operation.attributes;
	}
}

export default Operation;
