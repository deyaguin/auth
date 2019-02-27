import { Services } from '../services';

type SetSnackbarFunction = (message: string, type: string) => void;

class Store {
	private services: Services;
	private setSnackbar: SetSnackbarFunction;

	public constructor(services: Services, setSnackbar: SetSnackbarFunction) {
		this.services = services;
		this.setSnackbar = setSnackbar;
	}
}

export default Store;
