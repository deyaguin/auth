import React, { FC, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

import PageTitle from './PageTitle';

const styles = createStyles({
	container: {
		flexGrow: 1,
	},
	content: {
		flexGrow: 1,
	},
	paper: {
		display: 'flex',
		flexGrow: 1,
		height: '100%',
		width: '100%',
	},
});

interface IPageProps extends WithStyles<typeof styles> {
	children: ReactNode | string;
	headerTitle: string;
	actions?: ReactNode[];
	filters?: ReactNode;
}

const Page: FC<IPageProps> = ({ children, filters, headerTitle, actions, classes }) => (
	<Fade in={true} timeout={400}>
		<Grid
			container={true}
			direction="column"
			className={classes.container}
			spacing={16}
			wrap="nowrap"
		>
			<PageTitle actions={actions}>{headerTitle}</PageTitle>
			{filters && (
				<Grid item={true} container={true}>
					{filters}
				</Grid>
			)}
			<Grid className={classes.content} item={true} container={true}>
				<Paper className={classes.paper}>{children}</Paper>
			</Grid>
		</Grid>
	</Fade>
);

export default withStyles(styles)(Page);
