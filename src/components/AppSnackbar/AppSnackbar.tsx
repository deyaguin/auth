import React, { FC } from 'react';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, WithStyles, createStyles, Theme, StyleRules } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme): StyleRules =>
	createStyles({
		error: {
			backgroundColor: theme.palette.error.dark,
		},
		info: {
			backgroundColor: theme.palette.primary.dark,
		},
		success: {
			backgroundColor: green[600],
		},
		warning: {
			backgroundColor: amber[600],
		},
	});

interface IAppSnackbarProps extends WithStyles<typeof styles> {
	open?: boolean;
	message?: string;
	type?: string;
	onClose?: () => void;
	onAction?: () => void;
}

const AppSnackbar: FC<IAppSnackbarProps> = ({
	classes,
	open = false,
	message = '',
	type = 'default',
	onClose,
}) => (
	<Snackbar
		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		open={open}
		onClose={onClose}
	>
		<SnackbarContent
			className={classNames(classes[type])}
			message={message}
			action={[
				<IconButton onClick={onClose} key="action" color="inherit">
					<CloseIcon />
				</IconButton>,
			]}
		/>
	</Snackbar>
);

export default withStyles(styles)(AppSnackbar);
