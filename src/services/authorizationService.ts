import { AxiosRequestConfig } from 'axios';
import { filter } from 'rxjs/operators';

import { methodNames, authorizationPaths, authorizationActionNames } from '../constants';
import HttpService from './httpService';
import RequestFunction from './requestTypes/requestFunctionType';

interface SubscriptionProps {
	actionName: authorizationActionNames;
}

class AuthorizationService extends HttpService {
	constructor(request: RequestFunction, options?: AxiosRequestConfig) {
		super(request, options);

		this.init();
	}

	private init = () => {
		this.requests.rolesList = this.request(
			{
				method: methodNames.GET,
				url: authorizationPaths.AUTHORIZATION_ROLES_LIST,
			},
			authorizationActionNames.ROLES_LIST,
		);

		this.requests.createRole = this.request(
			{
				method: methodNames.POST,
				url: authorizationPaths.AUTHORIZATION_ROLE_CREATE,
			},
			authorizationActionNames.CREATE_ROLE,
		);

		this.subscriptions.usersList = this.observable.pipe(
			filter(
				({ actionName }: SubscriptionProps) => actionName === authorizationActionNames.ROLES_LIST,
			),
		);

		this.subscriptions.usersList = this.observable.pipe(
			filter(
				({ actionName }: SubscriptionProps) => actionName === authorizationActionNames.CREATE_ROLE,
			),
		);
	};
}

export default AuthorizationService;
