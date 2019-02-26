import Service from './service';
import { request } from './request';
import { methodNames, authenticationPaths, authorizationPaths } from '../constants';

class Services {
	public authentication: Service;
	public authorization: Service;

	public constructor() {
		this.authentication = new Service({ baseURL: authenticationPaths.AUTHENTICATION_BASE_URL });
		this.authorization = new Service({ baseURL: authorizationPaths.AUTHORIZATION_BASE_URL });

		this.initAuthentication();
		this.initAutherization();
	}

	private initAuthentication = () => {
		this.authentication.requests.usersList = request(
			{
				method: methodNames.GET,
				url: authenticationPaths.AUTHENTICATION_USERS_LIST,
			},
			this.authentication.client,
		);

		this.authentication.requests.createUser = request(
			{
				method: methodNames.POST,
				url: authenticationPaths.AUTHENTICATION_USER_CREATE,
			},
			this.authentication.client,
		);
	};

	private initAutherization = () => {
		this.authorization.requests.rolesList = request(
			{
				method: methodNames.GET,
				url: authorizationPaths.AUTHORIZATION_ROLES_LIST,
			},
			this.authorization.client,
		);

		this.authorization.requests.createRole = request(
			{
				method: methodNames.POST,
				url: authorizationPaths.AUTHORIZATION_ROLE_CREATE,
			},
			this.authorization.client,
		);
	};
}

export default Services;
