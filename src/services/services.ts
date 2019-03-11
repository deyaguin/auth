import { authenticationService, authorizationPaths } from '../constants';
import AuthorizationService from './authorizationService';
import AuthenticationService from './authenticationService';
import { HttpClient, restRequest, jrpcRequest } from '../core/httpClient';

class Services {
	public authentication: HttpClient;
	public authorization: HttpClient;

	public constructor() {
		this.authentication = new AuthenticationService(
			jrpcRequest(authenticationService.AUTHENTICATION_ENTRY_POINT),
			{
				baseURL: authenticationService.AUTHENTICATION_BASE_URL,
			},
		);
		this.authorization = new AuthorizationService(restRequest, {
			baseURL: authorizationPaths.AUTHORIZATION_BASE_URL,
		});
	}
}

export default Services;
