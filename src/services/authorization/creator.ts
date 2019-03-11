import AuthorizationService from './service';
import { HttpClient, restRequest } from '../../core/httpClient';
import * as config from './config';

export default (): HttpClient =>
	new AuthorizationService(restRequest(), {
		baseURL: config.AUTHORIZATION_BASE_URL,
	});
