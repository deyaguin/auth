import React, { FC } from 'react';
import classNames from 'classnames';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import BaseAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import { ui } from '../../constants';

const styles = createStyles({
	appBar: {
		position: 'absolute',
	},
	appBarShift: {
		left: ui.DRAWER_WIDTH,
		width: `calc(100% - ${ui.DRAWER_WIDTH}px)`,
	},
	menuButtonShift: {
		display: 'none',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	toolbarShift: {
		justifyContent: 'flex-end',
	},
});

interface IAppBarProps extends WithStyles<typeof styles> {
	onMenuClick: (e: any) => void;
	open: boolean;
}

const AppBar: FC<IAppBarProps> = ({ open, classes, onMenuClick }) => {
	return (
		<BaseAppBar className={classNames(classes.appBar, { [classes.appBarShift]: open })}>
			<Toolbar className={classNames(classes.toolbar, { [classes.toolbarShift]: open })}>
				<IconButton
					className={classNames({ [classes.menuButtonShift]: open })}
					color="inherit"
					onClick={onMenuClick}
				>
					<MenuIcon />
				</IconButton>
				<IconButton color="inherit">
					<AccountCircleIcon />
				</IconButton>
			</Toolbar>
		</BaseAppBar>
	);
};

export default withStyles(styles)(AppBar);
