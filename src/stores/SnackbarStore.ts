import { observable, action } from 'mobx';

import { Services } from '../services';

class SnackbarStore {
	@observable public open: boolean;
	@observable public message: string;
	@observable public type: string;

	constructor() {
		this.open = false;
		this.message = '';
		this.type = 'default';
	}

	@action public onClose = () => {
		this.open = false;
	};

	@action public setSnackbar = (message: string, type?: string) => {
		this.message = message;
		this.type = type || 'default';
		this.open = true;
	};

	@action public onAction = async (someAction: any) => {
		await someAction();
		this.onClose();
	};
}

export default SnackbarStore;
