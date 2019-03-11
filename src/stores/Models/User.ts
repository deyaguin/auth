import { observable } from 'mobx';

import User from '../Interfaces/User';

class UserModel {
	@observable private login: string;
	@observable private userId: string;

	constructor(user: User) {
		this.login = user.login;
		this.userId = user.user_id;
	}
}

export default UserModel;
