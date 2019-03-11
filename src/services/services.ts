import { authenticationPaths, authorizationPaths } from '../constants';
import AuthorizationService from './authorizationService';
import AuthenticationService from './authenticationService';
import { HttpService, RestRequest, JrpcRequest } from '../core/httpService';

class Services {
	public authentication: HttpService;
	public authorization: HttpService;

	public constructor() {
		this.authentication = new AuthenticationService(RestRequest, {
			baseURL: authenticationPaths.AUTHENTICATION_BASE_URL,
		});
		this.authorization = new AuthorizationService(RestRequest, {
			baseURL: authorizationPaths.AUTHORIZATION_BASE_URL,
		});
	}
}

export default Services;
