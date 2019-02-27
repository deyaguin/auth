import { Services } from '../services';

import AppStore from './AppStore';
import UsersStore from './UsersStore';
import GroupsStore from './GroupsStore';
import SnackbarStore from './SnackbarStore';

class RootStore {
	public appStore: AppStore;
	public usersStore: UsersStore;
	public groupsStore: GroupsStore;
	public snackbarStore: SnackbarStore;

	constructor(services: Services) {
		this.snackbarStore = new SnackbarStore();
		this.appStore = new AppStore(services);
		this.usersStore = new UsersStore(services, this.snackbarStore.setSnackbar);
		this.groupsStore = new GroupsStore(services, this.snackbarStore.setSnackbar);
	}
}

export default RootStore;
