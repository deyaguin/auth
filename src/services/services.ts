import HttpService from './httpService';
import { authenticationPaths, authorizationPaths } from '../constants';
import AuthorizationService from './authorizationService';
import AuthenticationService from './authenticationService';
import { jrpcRequest, restRequest } from './requestTypes';

class Services {
	public authentication: HttpService;
	public authorization: HttpService;

	public constructor() {
		this.authentication = new AuthenticationService(restRequest, {
			baseURL: authenticationPaths.AUTHENTICATION_BASE_URL,
		});
		this.authorization = new AuthorizationService(restRequest, {
			baseURL: authorizationPaths.AUTHORIZATION_BASE_URL,
		});
	}
}

export default Services;
