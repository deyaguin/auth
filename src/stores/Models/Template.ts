import { observable } from 'mobx';

import ITemplate from '../Interfaces/Template';

class Template {
	@observable private id: string;
	@observable private name: string;
	@observable private comment?: string;

	public constructor(template: ITemplate) {
		this.id = template.template_id;
		this.name = template.name;
		this.comment = template.comment;
	}
}

export default Template;
