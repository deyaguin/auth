import { AxiosResponse, AxiosError } from 'axios';

import { methodNames } from '../../constants';

interface RestRequestConfig {
	url: string;
	method: methodNames;
}

const request = function(this: any, config: RestRequestConfig, actionName: string) {
	return (data?: any) => {
		const { client, observer } = this;
		const requestConfig = { ...config, data };

		client
			.request(requestConfig)
			.then((response: AxiosResponse) => {
				observer.next({ actionName, result: response.data });
			})
			.catch((error: AxiosError) => {
				observer.error({ actionName, error });
			});
	};
};

export default request;
