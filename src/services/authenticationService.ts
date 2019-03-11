import { AxiosRequestConfig } from 'axios';
import { filter } from 'rxjs/operators';

import { methodNames, authenticationService, authenticationActionNames } from '../constants';
import { HttpClient } from '../core/httpClient';
import RequestFunction from '../core/httpClient/requestTypes/requestFunctionType';

interface ISubscriptionProps {
	actionName: authenticationActionNames;
}

class AuthenticationService extends HttpClient {
	constructor(request: RequestFunction, options?: AxiosRequestConfig) {
		super(request, options);

		this.init();
	}

	private init = () => {
		this.requests.usersList = this.request(
			{
				method: authenticationService.AUTHENTICATION_USERS_LIST,
			},
			authenticationActionNames.USERS_LIST,
		);

		this.requests.createUser = this.request(
			{
				method: methodNames.POST,
				url: authenticationService.AUTHENTICATION_USER_CREATE,
			},
			authenticationActionNames.CREATE_USER,
		);

		this.subscriptions.usersList = this.observable.pipe(
			filter(
				({ actionName }: ISubscriptionProps) => actionName === authenticationActionNames.USERS_LIST,
			),
		);

		this.subscriptions.createUser = this.observable.pipe(
			filter(
				({ actionName }: ISubscriptionProps) =>
					actionName === authenticationActionNames.CREATE_USER,
			),
		);
	};
}

export default AuthenticationService;
