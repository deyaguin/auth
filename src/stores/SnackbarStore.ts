import { observable, action } from 'mobx';

class SnackbarStore {
	@observable private open: boolean;
	@observable private message: string;
	@observable private type: string;
	@observable private action: any;

	constructor() {
		this.open = false;
		this.message = '';
		this.type = 'default';
		this.action = null;
	}

	@action public onClose = () => {
		this.open = false;
	};

	@action public setSnackbar = (message: string, type?: string) => {
		this.message = message;
		this.type = type || 'default';
		this.open = true;
	};

	@action public onAction = async () => {
		if (this.action) {
			await this.action();
		}

		this.onClose();
	};
}

export default SnackbarStore;
