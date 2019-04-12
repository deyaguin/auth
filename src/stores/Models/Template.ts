import { observable } from 'mobx';

import ITemplate from '../Interfaces/Template';
import ITask from '../Interfaces/Task';
import Task from './Task';

class Template {
	@observable public id: string;
	@observable public name: string;
	@observable public tags?: string;
	@observable public comment?: string;
	@observable public tasks?: Task[];

	public constructor(template: ITemplate) {
		this.id = template.template_id;
		this.name = template.name;
		this.comment = template.comment;
		this.tags = template.tags;
		this.tasks = template.tasks ? template.tasks.map((item: ITask) => new Task(item)) : [];
	}
}

export default Template;
