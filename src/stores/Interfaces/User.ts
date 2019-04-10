import ITask from './Task';

interface IUser {
	login: string;
	tag?: string;
	user_id: string;
	tasks?: ITask[];
}

export default IUser;
