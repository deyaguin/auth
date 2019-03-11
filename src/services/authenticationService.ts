import { AxiosRequestConfig } from 'axios';
import { filter } from 'rxjs/operators';

import { methodNames, authenticationPaths, authenticationActionNames } from '../constants';
import { HttpClient } from '../core/httpClient';
import RequestFunction from '../core/httpClient/requestTypes/requestFunctionType';

interface SubscriptionProps {
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
				method: methodNames.GET,
				url: authenticationPaths.AUTHENTICATION_USERS_LIST,
			},
			authenticationActionNames.USERS_LIST,
		);

		this.requests.createUser = this.request(
			{
				method: methodNames.POST,
				url: authenticationPaths.AUTHENTICATION_USER_CREATE,
			},
			authenticationActionNames.CREATE_USER,
		);

		this.subscriptions.usersList = this.observable.pipe(
			filter(
				({ actionName }: SubscriptionProps) => actionName === authenticationActionNames.USERS_LIST,
			),
		);

		this.subscriptions.createUser = this.observable.pipe(
			filter(
				({ actionName }: SubscriptionProps) => actionName === authenticationActionNames.CREATE_USER,
			),
		);
	};
}

export default AuthenticationService;
