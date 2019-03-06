import { AxiosResponse, AxiosError } from 'axios';

import { jrpcConfig } from '../../constants';

interface JrpcRequestConfig {
	method: string;
}

interface JrpcResponse {
	error?: any;
	result?: any;
}

const request = function(this: any, config: JrpcRequestConfig, actionName: string) {
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
					observer.error({ actionName, error: response.data.error });
				}
			})
			.catch((error: AxiosError) => {
				observer.error({ actionName, error });
			});
	};
};

export default request;
