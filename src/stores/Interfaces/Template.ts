import ITask from './Task';

interface ITemplate {
	name: string;
	template_id: string;
	comment?: string;
	tasks?: ITask[];
}

export default ITemplate;
