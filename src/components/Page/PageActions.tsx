import React, { FunctionComponent, ReactNode } from 'react';

import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			'& > button:nth-child(n + 2)': {
				marginLeft: theme.spacing.unit * 3,
			},
			display: 'flex',
		},
	});

interface IPageActionsProps extends WithStyles<typeof styles> {
	actions?: ReactNode[];
}

const PageActions: FunctionComponent<IPageActionsProps> = ({ classes, actions = [] }) => (
	<div className={classes.container}>{actions}</div>
);

export default withStyles(styles)(PageActions);
