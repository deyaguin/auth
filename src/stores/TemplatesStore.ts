import { observable, action, computed, toJS } from 'mobx';

import Store from './Store';
import { Services } from '../services';
import Template from './Models/Template';
import ILoadingStore from './Interfaces/LoadingStore';
import IPagintaionStore from './Interfaces/PaginationStore';

class TemplatesStore extends Store implements ILoadingStore, IPagintaionStore {
	@observable public loading: boolean;
	@observable public limit: number;
	@observable public offset: number;
	@observable private templatesMap: { [id: string]: Template };

	public constructor(services: Services, setSnackbar: (message: string, type: string) => void) {
		super(services, setSnackbar);

		this.templatesMap = {
			'1': new Template({ template_id: '1', name: 'Диспетчер УК', comment: 'test' }),
			'2': new Template({ template_id: '2', name: 'Диспетчер УК', comment: 'test' }),
			'3': new Template({ template_id: '3', name: 'Диспетчер УК', comment: 'test' }),
		};
		this.loading = false;
		this.limit = 10;
		this.offset = 0;
	}

	@action public setLoading = (loading: boolean) => {
		this.loading = loading;
	};

	@action public setLimit = (limit: number) => {
		this.limit = limit;
	};

	@action public setOffset = (offset: number) => {
		this.offset = offset;
	};

	@action public templateCreate = (values: any) => {
		// todo
	};

	@action public templateDelete = (id: string) => {
		// todo
		console.log(id);
	};

	@computed public get templates() {
		return Object.values(toJS(this.templatesMap));
	}
}

export default TemplatesStore;
