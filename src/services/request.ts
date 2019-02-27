import { Observable } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';

import { methodNames } from '../constants';

interface RequestConfig {
	method: methodNames;
	url: string;
}

const request = function(this: any, config: RequestConfig) {
	return (data?: any) => {
		const requestConfig = { ...config, data };

		return Observable.create((observer: any) => {
			observer.next(10);
			this.client
				.request(requestConfig)
				.then((response: AxiosResponse) => {
					observer.next(response);
					observer.complete();
				})
				.catch((error: AxiosError) => {
					observer.error(error);
				});
		});
	};
};

export { request };
