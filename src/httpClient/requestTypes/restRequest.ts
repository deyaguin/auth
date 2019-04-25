import { AxiosResponse, AxiosError } from 'axios';

import { HTTP_METHODS } from '../../constants';
import RequestFunction from './requestFunctionType';

interface IRestRequestConfig {
	url: string;
	method: HTTP_METHODS;
}

const request: () => RequestFunction = () =>
	function(this: any, config: IRestRequestConfig, actionName: string) {
		return async (data?: any, action?: () => void) => {
			const { client, observer } = this;
			const requestConfig = { ...config, data };

			if (action) {
				await action();
			}

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
