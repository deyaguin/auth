import { observable, action } from 'mobx';

class SnackbarStore {
	@observable public open: boolean;
	@observable public message: string;
	@observable public type: string;
	@observable public action: any;

	public constructor() {
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

		setTimeout(() => {
			this.onClose();
		}, 5000);
	};

	@action public onAction = async () => {
		if (this.action) {
			await this.action();
		}

		this.onClose();
	};
}

export default SnackbarStore;
