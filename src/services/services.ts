import { authenticationPaths, authorizationPaths } from '../constants';
import AuthorizationService from './authorizationService';
import AuthenticationService from './authenticationService';
import { HttpClient, RestRequest, JrpcRequest } from '../core/httpClient';

class Services {
	public authentication: HttpClient;
	public authorization: HttpClient;

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
