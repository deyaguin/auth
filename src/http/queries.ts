import { Observable } from 'rxjs';

import { paths } from '../constants';
import Client from '../http';

const auth = () =>
	Observable.create((observer: any) => {
		Client.getInstance()
			.client.get(paths.AUTH)
			.then(response => {
				observer.next(response.data);
				observer.complete();
			})
			.catch(error => {
				observer.error(error);
			});
	});

export { auth };
