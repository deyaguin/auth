import { Observable, Observer } from 'rxjs';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

type RequestFunction = (data?: any) => void;

interface RequestFunctions {
	[name: string]: RequestFunction;
}

class Service {
	public requests: RequestFunctions;
	public subscriptions: any;
	public client: AxiosInstance;
	public observable: Observable<any>;

	private observer?: Observer<any>;

	public constructor(options?: AxiosRequestConfig) {
		this.client = axios.create(options);
		this.requests = {};
		this.subscriptions = {};
		this.observable = Observable.create((observer: any) => {
			this.observer = observer;
		});
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
