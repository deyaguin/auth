import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { routes, ui } from '../../constants';

const styles = (theme: Theme) =>
	createStyles({
		drawer: {
			position: 'absolute',
			width: ui.DRAWER_WIDTH,
		},
		drawerHeader: {
			...theme.mixins.toolbar,
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'flex-end',
		},
		drawerPaper: {
			width: ui.DRAWER_WIDTH,
		},
		link: {
			textDecoration: 'none !important',
		},
		menu: {
			padding: 0,
		},
		menuItem: {
			[theme.breakpoints.up('sm')]: {
				padding: theme.spacing.unit * 3,
			},
			padding: theme.spacing.unit * 2,
		},
	});

interface IAppDrawerProps extends WithStyles<typeof styles> {
	open: boolean;
	onMenuClose: () => void;
}

const AppDrawer: FC<IAppDrawerProps> = ({ open, onMenuClose, classes }) => {
	const renderHeader = (): ReactElement => (
		<div className={classes.drawerHeader}>
			<IconButton onClick={onMenuClose}>
				<ChevronLeftIcon />
			</IconButton>
		</div>
	);

	const renderMenuItem = (route: string, name: string): ReactElement => (
		<Link className={classes.link} to={route}>
			<ListItem className={classes.menuItem} button={true}>
				<Typography variant="button">{name}</Typography>
			</ListItem>
		</Link>
	);

	const renderMenu = (): ReactElement => (
		<List className={classes.menu}>
			{renderMenuItem(routes.USERS, 'Пользователи')}
			{renderMenuItem(routes.TEMPLATES, 'Шаблоны')}
		</List>
	);

	return (
		<Drawer
			classes={{ paper: classes.drawerPaper }}
			anchor="left"
			className={classes.drawer}
			open={open}
			variant="persistent"
		>
			{renderHeader()}
			<Divider />
			{renderMenu()}
		</Drawer>
	);
};

export default withStyles(styles)(AppDrawer);
