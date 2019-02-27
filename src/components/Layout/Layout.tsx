import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { ui } from '../../constants';
import AppBar from './AppBar';
import AppDrawer from './AppDrawer';
import AppSnackbar from './AppSnackbar';

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

interface SnackbarOptions {
	open: boolean;
	message: string;
	type: string;
	onClose: () => void;
	onAction: () => void;
}

interface LayoutProps extends WithStyles<typeof styles> {
	children: React.ReactElement;
	snackbarOptions?: SnackbarOptions;
}

const appSnackbarDefaultProps = {
	message: '',
	open: false,
	type: 'default',
};

const Layout: FunctionComponent<LayoutProps> = ({ children, classes, snackbarOptions }) => {
	const [open, setOpen]: [boolean, (open: boolean) => void] = useState(false);

	const handleMenuClick = (): void => {
		setOpen(!open);
	};

	return (
		<div className={classes.container}>
			<AppBar onMenuClick={handleMenuClick} open={open} />
			<AppDrawer onMenuClose={handleMenuClick} open={open} />
			<main className={classNames(classes.appContent, { [classes.appContentShift]: open })}>
				{children}
			</main>
			<AppSnackbar {...{ ...appSnackbarDefaultProps, ...snackbarOptions }} />
		</div>
	);
};

export default withStyles(styles)(Layout);
