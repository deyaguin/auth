import { Observable } from 'rxjs';
import { AxiosResponse, AxiosError, AxiosInstance } from 'axios';

import RequestConfig from './requestConfig';

const request = (config: RequestConfig, client: AxiosInstance) => {
	return (data?: any) => {
		const requestConfig = { ...config, data };

		return Observable.create((observer: any) => {
			client
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
