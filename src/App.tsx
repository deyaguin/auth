import React, { Component } from 'react';
import { Provider } from 'mobx-react';

import { Services } from './services';
import createTheme from './createTheme';
import { RootStore } from './stores';
import Root from './containers';

const theme = createTheme({});

const services = new Services();
class App extends Component {
	private rootStore: RootStore = new RootStore(services);

	public render() {
		return (
			<Provider {...this.rootStore}>
				<Root />
			</Provider>
		);
	}
}

export default App;
