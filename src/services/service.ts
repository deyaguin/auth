import { Observable } from 'rxjs';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

type RequestFunction = (data?: any) => Observable<any>;

interface RequestFunctions {
	[name: string]: RequestFunction;
}

class Service {
	public requests: RequestFunctions;
	public client: AxiosInstance;

	public constructor(options?: AxiosRequestConfig) {
		this.client = axios.create(options);
		this.requests = {};
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
