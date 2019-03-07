import { AxiosRequestConfig } from 'axios';
import { filter } from 'rxjs/operators';

import { methodNames, authorizationPaths, authorizationActionNames } from '../constants';
import Service from './service';
import { restRequest } from './requestTypes';
import RequestFunction from './requestTypes/requestFunctionType';

interface SubscriptionProps {
	actionName: authorizationActionNames;
}

class AuthorizationService extends Service {
	constructor(options?: AxiosRequestConfig, requestFunction?: RequestFunction) {
		super(options, requestFunction);

		this.init();
	}

	private init = () => {
		const request = restRequest.bind(this);

		this.requests.rolesList = request(
			{
				method: methodNames.GET,
				url: authorizationPaths.AUTHORIZATION_ROLES_LIST,
			},
			authorizationActionNames.ROLES_LIST,
		);

		this.requests.createRole = request(
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
