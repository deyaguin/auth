import { Services } from '../services';

import AppStore from './AppStore';
import UsersStore from './UsersStore';
import GroupsStore from './GroupsStore';

class RootStore {
	public appStore: AppStore;
	public usersStore: UsersStore;
	public groupsStore: GroupsStore;

	constructor(services: Services) {
		this.appStore = new AppStore(services);
		this.usersStore = new UsersStore(services);
		this.groupsStore = new GroupsStore(services);
	}
}

export default RootStore;
