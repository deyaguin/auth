import { observable } from 'mobx';

import ITemplate from '../Interfaces/Template';

class Template {
	@observable public id: string;
	@observable public name: string;
	@observable public comment?: string;

	public constructor(template: ITemplate) {
		this.id = template.template_id;
		this.name = template.name;
		this.comment = template.comment;
	}
}

export default Template;
