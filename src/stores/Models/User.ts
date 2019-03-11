import { observable } from 'mobx';

import IUser from '../Interfaces/User';

class UserModel {
	@observable private login: string;
	@observable private userId: string;

	constructor(user: IUser) {
		this.login = user.login;
		this.userId = user.user_id;
	}
}

export default UserModel;
