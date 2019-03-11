import { HttpClient } from '../core/httpClient';
import authenticationCreator from './authentication';
import authorizationCreator from './authorization';

class Services {
	public authentication: HttpClient;
	public authorization: HttpClient;

	public constructor() {
		this.authentication = authenticationCreator();
		this.authorization = authorizationCreator();
	}
}

export default Services;
