import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import createTheme from './createTheme';
import Client from './http';
import { RootStore } from './stores';
import { paths } from './constants';
import Root from './containers';

const options = { baseURL: paths.BASE_URL };

const client = Client.getInstance(options);

const theme = createTheme({});
class App extends Component {
	private rootStore: RootStore = new RootStore(client);

	public render() {
		return (
			<Provider {...this.rootStore}>
				<Root />
			</Provider>
		);
	}
}

export default App;
