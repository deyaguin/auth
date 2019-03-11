import { AxiosResponse, AxiosError } from 'axios';

import { jrpcConfig } from '../../../constants';
import RequestFunction from './requestFunctionType';

interface IJrpcRequestConfig {
	method: string;
}

interface IJrpcResponse {
	error?: any;
	result?: any;
}

const request: (entryPoint?: string) => RequestFunction = (entryPoint?: string) =>
	function(this: any, config: IJrpcRequestConfig, actionName: string) {
		return async (params?: any, action?: () => void) => {
			const { client, observer } = this;
			const requestConfig = { ...jrpcConfig, ...config, params };

			if (action) {
				await action();
			}

			client
				.post(entryPoint, requestConfig)
				.then((response: AxiosResponse<IJrpcResponse>) => {
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
