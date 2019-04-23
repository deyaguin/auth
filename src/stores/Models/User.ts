import { observable } from 'mobx';

import Task from './Task';
import ITask from '../Interfaces/Task';
import IUser from '../Interfaces/User';

class User {
	@observable public login: string;
	@observable public id: string;
	@observable public tags?: string;
	@observable public tasks?: Task[];

	public constructor(user: IUser) {
		this.login = user.login;
		this.id = user.user_id;
		this.tags = user.tags;
		this.tasks = user.tasks ? user.tasks.map((item: ITask) => new Task(item)) : [];
	}
}

export default User;
