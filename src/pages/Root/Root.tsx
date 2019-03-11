import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from '../../constants';
import Auth from '../Auth';
import Users from '../Users';
import Groups from '../Groups';
import Roles from '../Roles';
import Registry from '../Registry';
import { Layout } from '../../components';

interface ISnackbarOptions {
	open: boolean;
	message: string;
	type: string;
	onClose: () => void;
	onAction: () => void;
}

interface IRootProps {
	snackbarOptions?: ISnackbarOptions;
}

const Root = ({ snackbarOptions }: IRootProps) => (
	<BrowserRouter>
		<Layout snackbarOptions={snackbarOptions}>
			<Switch>
				<Route path={routes.AUTH} component={Auth} />
				<Route path={routes.USERS} component={Users} />
				<Route path={routes.GROUPS} component={Groups} />
				<Route path={routes.ROLES} component={Roles} />
				<Route path={routes.REGISTRY} component={Registry} />
			</Switch>
		</Layout>
	</BrowserRouter>
);

export default Root;
