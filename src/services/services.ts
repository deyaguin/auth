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
		const authenticationRequest = request.bind(this.authentication);

		this.authentication.requests.usersList = authenticationRequest({
			method: methodNames.GET,
			url: authenticationPaths.AUTHENTICATION_USERS_LIST,
		});

		this.authentication.requests.createUser = authenticationRequest({
			method: methodNames.POST,
			url: authenticationPaths.AUTHENTICATION_USER_CREATE,
		});
	};

	private initAutherization = () => {
		const authenticationRequest = request.bind(this.authorization);

		this.authorization.requests.rolesList = authenticationRequest({
			method: methodNames.GET,
			url: authorizationPaths.AUTHORIZATION_ROLES_LIST,
		});

		this.authorization.requests.createRole = authenticationRequest({
			method: methodNames.POST,
			url: authorizationPaths.AUTHORIZATION_ROLE_CREATE,
		});
	};
}

export default Services;
