import ITask from './Task';

interface ITemplate {
	name: string;
	template_id: string;
	tags?: string;
	comment?: string;
	tasks?: ITask[];
}

export default ITemplate;
