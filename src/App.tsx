import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { Services } from './services';
import createTheme from './createTheme';
import { RootStore } from './stores';
import Root from './pages';

const theme = createTheme({});

const services = new Services();
class App extends Component {
	private rootStore: RootStore = new RootStore(services);

	public render() {
		return (
			<Provider {...this.rootStore}>
				<MuiThemeProvider theme={theme}>
					<Root />
				</MuiThemeProvider>
			</Provider>
		);
	}
}

export default App;
