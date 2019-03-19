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

class AuthorizationService extends HttpClient {
	constructor(request: RequestFunction, options?: AxiosRequestConfig) {
		super(request, options);

		this.init();
	}

	private init = () => {
		this.requests.rolesList = this.request(
			{
				method: httpMethods.GET,
				url: config.AUTHORIZATION_ROLES_LIST,
			},
			actionNames.ROLES_LIST,
		);

		this.requests.createRole = this.request(
			{
				method: httpMethods.POST,
				url: config.AUTHORIZATION_ROLE_CREATE,
			},
			actionNames.CREATE_ROLE,
		);

		this.subscriptions.usersList = this.observable.pipe(
			filter(({ actionName }: ISubscriptionProps) => actionName === actionNames.ROLES_LIST),
		);

		this.subscriptions.usersList = this.observable.pipe(
			filter(({ actionName }: ISubscriptionProps) => actionName === actionNames.CREATE_ROLE),
		);
	};
}

export default AuthorizationService;