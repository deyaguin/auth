import { AxiosResponse, AxiosError } from 'axios';

import { jrpcConfig } from '../../constants';
import RequestFunction from './requestFunctionType';

interface JrpcRequestConfig {
	method: string;
}

interface JrpcResponse {
	error?: any;
	result?: any;
}

const request: RequestFunction = function(
	this: any,
	config: JrpcRequestConfig,
	actionName: string,
) {
	return (params?: any) => {
		const { client, observer } = this;
		const requestConfig = { data: { ...jrpcConfig, ...config, params } };

		client
			.post(requestConfig)
			.then((response: AxiosResponse<JrpcResponse>) => {
				if (response.data.result) {
					observer.next({ actionName, result: response.data.result });
				}
				if (response.data.error) {
					observer.next({ actionName, error: response.data.error });
				}
			})
			.catch((error: AxiosError) => {
				observer.next({ actionName, error });
			});
	};
};

export default request;
