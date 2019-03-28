import { Services } from '../services';

import AppStore from './AppStore';
import UsersStore from './UsersStore';
import TemplatesStore from './TemplatesStore';
import TasksStore from './TasksStore';
import SnackbarStore from './SnackbarStore';

class RootStore {
	public appStore: AppStore;
	public usersStore: UsersStore;
	public snackbarStore: SnackbarStore;
	public templatesStore: TemplatesStore;
	public tasksStore: TasksStore;

	constructor(services: Services) {
		this.snackbarStore = new SnackbarStore();
		this.appStore = new AppStore(services, this.snackbarStore.setSnackbar);
		this.usersStore = new UsersStore(services, this.snackbarStore.setSnackbar);
		this.templatesStore = new TemplatesStore(services, this.snackbarStore.setSnackbar);
		this.tasksStore = new TasksStore(services, this.snackbarStore.setSnackbar);
	}
}

export default RootStore;
