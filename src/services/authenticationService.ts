import { AxiosRequestConfig } from 'axios';
import { filter } from 'rxjs/operators';

import { methodNames, authenticationPaths, authenticationActionNames } from '../constants';
import Service from './service';
import { restRequest } from './requestTypes';

interface SubscriptionProps {
	actionName: authenticationActionNames;
}

class AuthenticationService extends Service {
	constructor(options?: AxiosRequestConfig) {
		super(options);

		this.init();
	}

	private init = () => {
		const request = restRequest.bind(this);

		this.requests.usersList = request(
			{
				method: methodNames.GET,
				url: authenticationPaths.AUTHENTICATION_USERS_LIST,
			},
			authenticationActionNames.USERS_LIST,
		);

		this.requests.createUser = request(
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
