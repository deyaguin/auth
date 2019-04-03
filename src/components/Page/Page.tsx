import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

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
			flexDirection: 'column',
			marginTop: theme.spacing.unit * 3,
		},
		filters: {
			marginTop: theme.spacing.unit * 3,
		},
	});

interface IPageProps extends WithStyles<typeof styles> {
	contentClass?: string;
	children: ReactNode | string;
	headerTitle: string;
	actions?: ReactNode[];
	filters?: ReactNode;
}

const Page: FC<IPageProps> = ({
	children,
	filters,
	headerTitle,
	actions,
	contentClass,
	classes,
}) => (
	<Fade in={true} timeout={400}>
		<div className={classes.container}>
			<PageTitle actions={actions}>{headerTitle}</PageTitle>
			<div className={classes.filters}>{filters}</div>
			<Paper className={classNames(classes.content, contentClass)}>{children}</Paper>
		</div>
	</Fade>
);

export default withStyles(styles)(Page);
