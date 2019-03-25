import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from '../../constants';
import Auth from '../Auth';
import Users from '../Users';
import Templates from '../Templates';
import Template from '../Template';
import TemplateCreate from '../TemplateCreate';
import NotFound from '../NotFound';
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
	drawerOpen?: boolean;
	setDrawerOpen?: (drawerOpen: boolean) => void;
}

const Root = ({ snackbarOptions, drawerOpen, setDrawerOpen }: IRootProps) => (
	<BrowserRouter>
		<Layout drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} snackbarOptions={snackbarOptions}>
			<Switch>
				<Route path={routes.AUTH} component={Auth} />
				<Route path={routes.USERS} component={Users} />
				<Route path={routes.TEMPLATES} component={Templates} exact={true} />
				<Route path={routes.TEMPLATE_CREATE} component={TemplateCreate} exact={true} />
				<Route path={routes.TEMPLATE} component={Template} exact={true} />
				<Route component={NotFound} />
			</Switch>
		</Layout>
	</BrowserRouter>
);

export default Root;
