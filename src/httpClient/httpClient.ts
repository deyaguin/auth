import { Observable, Observer } from 'rxjs';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

import RequestFunction from './requestTypes/requestFunctionType';

interface IRequestCallback {
	[name: string]: (params?: any, action?: () => void) => void;
}

class HttpClient {
	public requests: IRequestCallback;
	public subscriptions: any;
	public client: AxiosInstance;
	public observable: Observable<any>;
	protected request: RequestFunction;

	private observer?: Observer<any>;

	public constructor(request: RequestFunction, options?: AxiosRequestConfig) {
		this.client = axios.create(options);
		this.requests = {};
		this.subscriptions = {};
		this.observable = Observable.create((observer: any) => {
			this.observer = observer;
		});
		this.request = request;
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

export default HttpClient;
