import { Observable, Observer } from 'rxjs';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import RequestFunction from './requestTypes/requestFunctionType';

interface RequestFunctions {
	[name: string]: (data?: any) => void;
}

class Service {
	public requests: RequestFunctions;
	public subscriptions: any;
	public client: AxiosInstance;
	public observable: Observable<any>;
	protected requestFunction?: RequestFunction;

	private observer?: Observer<any>;

	public constructor(options?: AxiosRequestConfig, requestFunction?: RequestFunction) {
		this.client = axios.create(options);
		this.requests = {};
		this.subscriptions = {};
		this.observable = Observable.create((observer: any) => {
			this.observer = observer;
		});
		this.requestFunction = requestFunction;
	}

	public setHeaders = (headers: any): void => {
		this.client.defaults.headers = {
			...this.client.defaults.headers,
			...headers,
		};
	};

	public getHeader = (headerName: string): string => {
		return this.client.defaults.headers[headerName];
	};

	public removeHeader = (headerName: string): void => {
		delete this.client.defaults.headers[headerName];
	};
}

export default Service;
