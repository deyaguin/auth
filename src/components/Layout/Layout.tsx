import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { ui } from '../../constants';
import AppBar from './AppBar';
import AppDrawer from './AppDrawer';
import AppBody from './AppBody';

const styles = (theme: Theme) =>
	createStyles({
		appContent: {
			'@media (min-width:0px) and (orientation: landscape)': {
				marginTop: 48,
			},
			'@media (min-width:600px)': {
				marginTop: 64,
				padding: theme.spacing.unit * 3,
			},
			flexGrow: 1,
			marginTop: 56,
			padding: theme.spacing.unit * 2,
		},
		appContentShift: {
			marginLeft: ui.DRAWER_WIDTH,
		},
		container: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
		},
	});

interface ILayoutProps extends WithStyles<typeof styles> {
	children: React.ReactElement;
	drawerOpen: boolean;
	setDrawerOpen: (drawerOpen: boolean) => void;
}

const Layout: FunctionComponent<ILayoutProps> = ({
	children,
	classes,
	drawerOpen,
	setDrawerOpen,
}) => {
	const handleMenuClick = (): void => {
		setDrawerOpen(!drawerOpen);
	};

	return (
		<div className={classes.container}>
			<AppBar onMenuClick={handleMenuClick} open={drawerOpen} />
			<AppDrawer onMenuClose={handleMenuClick} open={drawerOpen} />
			<AppBody
				className={classNames(classes.appContent, { [classes.appContentShift]: drawerOpen })}
			>
				{children}
			</AppBody>
		</div>
	);
};

export default withStyles(styles)(Layout);
