import React, { FunctionComponent, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import PageTitle from './PageTitle';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			minWidth: 900,
		},
		content: {
			display: 'flex',
			flex: 1,
			marginTop: theme.spacing.unit * 3,
		},
	});

interface IPageProps extends WithStyles<typeof styles> {
	children: ReactNode | string;
	headerTitle: string;
	actions?: ReactNode[];
}

const Page: FunctionComponent<IPageProps> = ({ children, headerTitle, actions, classes }) => (
	<div className={classes.container}>
		<PageTitle actions={actions}>{headerTitle}</PageTitle>
		<Paper className={classes.content}>{children}</Paper>
	</div>
);

export default withStyles(styles)(Page);
