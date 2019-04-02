import React, { FC } from 'react';
import classNames from 'classnames';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

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
			boxSizing: 'border-box',
			flexGrow: 1,
			height: 'calc(100% - 64px)',
			marginTop: 56,
			padding: theme.spacing.unit * 2,
		},
		appContentShift: {
			marginLeft: ui.DRAWER_WIDTH,
		},
		container: {
			backgroundColor: grey[100],
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

const Layout: FC<ILayoutProps> = ({ children, classes, drawerOpen, setDrawerOpen }) => {
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
