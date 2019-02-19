import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from '../../constants';
import Auth from '../Auth';
import Users from '../Users';
import Groups from '../Groups';

const Root = () => (
	<BrowserRouter>
		<Switch>
			<Route path={routes.AUTH} component={Auth} />
			<Route path={routes.USERS} component={Users} />
			<Route path={routes.GROUPS} component={Groups} />
		</Switch>
	</BrowserRouter>
);

export default Root;
