import AppStore from './AppStore';
import UsersStore from './UsersStore';
import GroupsStore from './GroupsStore';
import Client from '../http';

class RootStore {
	public appStore: AppStore;
	public usersStore: UsersStore;
	public groupsStore: GroupsStore;

	constructor(client: Client) {
		this.appStore = new AppStore(client);
		this.usersStore = new UsersStore(client);
		this.groupsStore = new GroupsStore(client);
	}
}

export default RootStore;
