import { Services } from '../services';

type SetSnackbarFunction = (message: string, type: string) => void;

class Store {
	protected services: Services;
	protected setSnackbar: SetSnackbarFunction;

	public constructor(services: Services, setSnackbar: SetSnackbarFunction) {
		this.services = services;
		this.setSnackbar = setSnackbar;
	}
}

export default Store;
