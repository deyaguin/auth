import React, { FunctionComponent, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import PageTitle from './PageTitle';

const styles = createStyles({
	container: {
		display: 'grid',
		gridGap: '24px',
		gridTemplateRows: '40px 1fr',
		height: '100%',
	},
	content: {
		height: '100%',
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
