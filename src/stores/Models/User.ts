import { observable } from 'mobx';

class User {
	@observable public login: string;

	constructor(login: string) {
		this.login = login;
	}
}

export default User;
