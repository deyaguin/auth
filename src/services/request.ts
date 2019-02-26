import { Observable } from 'rxjs';
import { AxiosResponse, AxiosError, AxiosInstance } from 'axios';

import Service from './service';
import RequestConfig from './requestConfig';

const request = function(this: any, config: RequestConfig) {
	return (data?: any) => {
		const requestConfig = { ...config, data };

		return Observable.create((observer: any) => {
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
