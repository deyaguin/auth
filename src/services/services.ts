import { filter, tap } from 'rxjs/operators';

import Service from './service';
import { request } from './request';
import {
	methodNames,
	authenticationPaths,
	authorizationPaths,
	authorizationActionNames,
	authenticationActionNames,
} from '../constants';

type ActionNames = authenticationActionNames | authorizationActionNames;

interface SubscriptionProps {
	actionName: ActionNames;
}

class Services {
	public authentication: Service;
	public authorization: Service;

	public constructor() {
		this.authentication = new Service({ baseURL: authenticationPaths.AUTHENTICATION_BASE_URL });
		this.authorization = new Service({ baseURL: authorizationPaths.AUTHORIZATION_BASE_URL });

		this.initAuthentication();
		this.initAuthorization();
	}

	private initAuthentication = () => {
		const { authentication } = this;
		const authenticationRequest = request.bind(authentication);

		authentication.requests.usersList = authenticationRequest(
			{
				method: methodNames.GET,
				url: authenticationPaths.AUTHENTICATION_USERS_LIST,
			},
			authenticationActionNames.USERS_LIST,
		);

		authentication.requests.createUser = authenticationRequest(
			{
				method: methodNames.POST,
				url: authenticationPaths.AUTHENTICATION_USER_CREATE,
			},
			authenticationActionNames.CREATE_USER,
		);

		authentication.subscriptions.usersList = authentication.observable.pipe(
			filter(
				({ actionName }: SubscriptionProps) => actionName === authenticationActionNames.USERS_LIST,
			),
		);

		authentication.subscriptions.createUser = authentication.observable.pipe(
			filter(
				({ actionName }: SubscriptionProps) => actionName === authenticationActionNames.CREATE_USER,
			),
		);
	};

	private initAuthorization = () => {
		const { authorization } = this;
		const authorizationRequest = request.bind(authorization);

		authorization.requests.rolesList = authorizationRequest(
			{
				method: methodNames.GET,
				url: authorizationPaths.AUTHORIZATION_ROLES_LIST,
			},
			authorizationActionNames.ROLES_LIST,
		);

		authorization.requests.createRole = authorizationRequest(
			{
				method: methodNames.POST,
				url: authorizationPaths.AUTHORIZATION_ROLE_CREATE,
			},
			authorizationActionNames.CREATE_ROLE,
		);

		authorization.subscriptions.usersList = authorization.observable.pipe(
			filter(
				({ actionName }: SubscriptionProps) => actionName === authorizationActionNames.ROLES_LIST,
			),
		);

		authorization.subscriptions.usersList = authorization.observable.pipe(
			filter(
				({ actionName }: SubscriptionProps) => actionName === authorizationActionNames.CREATE_ROLE,
			),
		);
	};
}

export default Services;
