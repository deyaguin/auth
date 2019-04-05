import React, { FC } from 'react';
import classNames from 'classnames';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import { DRAWER_WIDTH } from '../../constants/ui';
import AppBar from './AppBar';
import AppDrawer from './AppDrawer';
import AppBody from './AppBody';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			backgroundColor: grey[100],
			flexGrow: 1,
		},
		content: {
			boxSizing: 'border-box',
			display: 'flex',
			height: 'calc(100% - 64px)',
			padding: theme.spacing.unit * 2,
			position: 'relative',
			top: 64,
		},
		contentShift: {
			left: DRAWER_WIDTH,
			width: `calc(100% - ${DRAWER_WIDTH}px)`,
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
		<section className={classes.container}>
			<AppBar onMenuClick={handleMenuClick} open={drawerOpen} />
			<AppDrawer onMenuClose={handleMenuClick} open={drawerOpen} />
			<AppBody className={classNames(classes.content, { [classes.contentShift]: drawerOpen })}>
				{children}
			</AppBody>
		</section>
	);
};

export default withStyles(styles)(Layout);
