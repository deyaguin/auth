import { AxiosRequestConfig } from 'axios';
import { filter } from 'rxjs/operators';

import actionNames from './actionNames';
import { httpMethods } from '../../constants';
import { HttpClient } from '../../core/httpClient';
import RequestFunction from '../../core/httpClient/requestTypes/requestFunctionType';
import * as config from './config';

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
				method: config.AUTHENTICATION_USERS_LIST,
			},
			actionNames.USERS_LIST,
		);

		this.requests.createUser = this.request(
			{
				method: httpMethods.POST,
				url: config.AUTHENTICATION_USER_CREATE,
			},
			actionNames.CREATE_USER,
		);

		this.subscriptions.usersList = this.observable.pipe(
			filter(({ actionName }: ISubscriptionProps) => actionName === actionNames.USERS_LIST),
		);

		this.subscriptions.createUser = this.observable.pipe(
			filter(({ actionName }: ISubscriptionProps) => actionName === actionNames.CREATE_USER),
		);
	};
}

export default AuthenticationService;
