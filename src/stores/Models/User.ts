import { observable } from 'mobx';

import Task from './Task';
import ITask from '../Interfaces/Task';
import IUser from '../Interfaces/User';
import IProfile from '../Interfaces/Profile';

class User {
	@observable public profile?: IProfile;
	@observable public login: string;
	@observable public id: string;
	@observable public tag?: string;
	@observable public tasks?: Task[];

	public constructor(user: IUser, profile?: IProfile) {
		this.login = user.login;
		this.id = user.user_id;
		this.profile = profile;
		this.tag = user.tag;
		this.tasks = user.tasks ? user.tasks.map((item: ITask) => new Task(item)) : [];
	}
}

export default User;
