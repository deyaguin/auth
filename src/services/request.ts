import { AxiosResponse, AxiosError } from 'axios';

import { methodNames } from '../constants';

interface RequestConfig {
	method: methodNames;
	url: string;
}

const request = function(this: any, config: RequestConfig, actionName: string) {
	return (data?: any) => {
		const { client, observer } = this;
		const requestConfig = { ...config, data };

		client
			.request(requestConfig)
			.then((response: AxiosResponse) => {
				observer.next({ actionName, response });
			})
			.catch((error: AxiosError) => {
				observer.next({ actionName, error });
			});
	};
};

export { request };
