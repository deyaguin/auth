import { Observable } from 'rxjs';

import RequestConfig from './requestConfig';

type RequestFunction = (data?: any) => Observable<any>;

export default RequestFunction;
