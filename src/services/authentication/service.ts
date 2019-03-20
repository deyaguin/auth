import { AxiosRequestConfig } from 'axios';
import { filter } from 'rxjs/operators';

import actionNames from './actionNames';
import { httpMethods } from '../../constants';
import { HttpClient } from '../../httpClient';
import RequestFunction from '../../httpClient/requestTypes/requestFunctionType';
import methods from './methods';

interface ISubscriptionProps {
	actionName: actionNames;
}

class AuthenticationService extends HttpClient {
	constructor(request: RequestFunction, options?: AxiosRequestConfig) {
		super(request, options);

		this.init();
	}

	private init = () => {
		this.requests.usersList = this.request(
			{
				method: methods.AUTHENTICATION_USERS_LIST,
			},
			actionNames.USERS_LIST,
		);

		this.requests.createUser = this.request(
			{
				method: methods.AUTHENTICATION_USER_CREATE,
			},
			actionNames.USER_CREATE,
		);

		this.subscriptions.usersList = this.observable.pipe(
			filter(({ actionName }: ISubscriptionProps) => actionName === actionNames.USERS_LIST),
		);

		this.subscriptions.createUser = this.observable.pipe(
			filter(({ actionName }: ISubscriptionProps) => actionName === actionNames.USER_CREATE),
		);
	};
}

export default AuthenticationService;
