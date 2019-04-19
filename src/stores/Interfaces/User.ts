import ITask from './Task';

interface IUser {
	login: string;
	tags?: string;
	user_id: string;
	tasks?: ITask[];
}

export default IUser;
