import { observable } from 'mobx';

import IUser from '../Interfaces/User';

class User {
	@observable private login: string;
	@observable private id: string;

	public constructor(user: IUser) {
		this.login = user.login;
		this.id = user.user_id;
	}
}

export default User;
