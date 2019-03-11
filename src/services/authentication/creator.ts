import { HttpClient, jrpcRequest } from '../../core/httpClient';
import AuthenticationService from './service';
import * as config from './config';
import jrpcConfig from './jrpcConfig';

export default (): HttpClient =>
	new AuthenticationService(jrpcRequest(config.AUTHENTICATION_ENTRY_POINT, jrpcConfig), {
		baseURL: config.AUTHENTICATION_BASE_URL,
	});
