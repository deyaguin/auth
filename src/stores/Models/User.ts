import { observable } from 'mobx';

import IUser from '../Interfaces/User';
import IProfile from '../Interfaces/Profile';

class User {
	@observable public profile?: IProfile;
	@observable public login: string;
	@observable public id: string;
	@observable public tag?: string;

	public constructor(user: IUser, profile?: IProfile) {
		this.login = user.login;
		this.id = user.user_id;
		this.profile = profile;
		this.tag = user.tag;
	}
}

export default User;
