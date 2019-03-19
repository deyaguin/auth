import { HttpClient, jrpcRequest } from '../../core/httpClient';
import AuthenticationService from './service';
import { AUTHENTICATION_BASE_URL, AUTHENTICATION_ENTRY_POINT } from './config';
import jrpcConfig from './jrpcConfig';

export default (): HttpClient =>
	new AuthenticationService(jrpcRequest(AUTHENTICATION_ENTRY_POINT, jrpcConfig), {
		baseURL: AUTHENTICATION_BASE_URL,
	});
