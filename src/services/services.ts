import Service from './service';
import { authenticationPaths, authorizationPaths } from '../constants';
import AuthorizationService from './authorizationService';
import AuthenticationService from './authenticationService';

class Services {
	public authentication: Service;
	public authorization: Service;

	public constructor() {
		this.authentication = new AuthenticationService({
			baseURL: authenticationPaths.AUTHENTICATION_BASE_URL,
		});
		this.authorization = new AuthorizationService({
			baseURL: authorizationPaths.AUTHORIZATION_BASE_URL,
		});
	}
}

export default Services;
