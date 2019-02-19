import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

class Client {
	public static getInstance(options?: AxiosRequestConfig): Client {
		if (this.instance) {
			return this.instance;
		}

		Client.instance = new Client(options);

		return this.instance;
	}

	private static instance: Client;

	public client: AxiosInstance;

	private constructor(options?: AxiosRequestConfig) {
		this.client = axios.create(options);
	}

	public addHeaders(headers: any) {
		this.client.defaults.headers = {
			...this.client.defaults.headers,
			...headers,
		};
	}

	public removeHeader(headerName: string) {
		delete this.client.defaults.headers[headerName];
	}
}

export default Client;
