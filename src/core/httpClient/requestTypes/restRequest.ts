import { AxiosResponse, AxiosError } from 'axios';

import { methodNames } from '../../../constants';
import RequestFunction from './requestFunctionType';

interface RestRequestConfig {
	url: string;
	method: methodNames;
}

const request: RequestFunction = function(
	this: any,
	config: RestRequestConfig,
	actionName: string,
) {
	return (data?: any) => {
		const { client, observer } = this;
		const requestConfig = { ...config, data };

		client
			.request(requestConfig)
			.then((response: AxiosResponse) => {
				observer.next({ actionName, result: response.data });
			})
			.catch((error: AxiosError) => {
				observer.next({ actionName, error });
			});
	};
};

export default request;
