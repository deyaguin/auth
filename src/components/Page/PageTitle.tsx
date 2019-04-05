import React, { FC, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PageActions from './PageActions';

const styles = createStyles({
	container: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
	},
});

interface IPageTitleProps extends WithStyles<typeof styles> {
	children: ReactNode | string;
	actions?: ReactNode[];
}

const PageTitle: FC<IPageTitleProps> = ({ children, actions, classes }) => {
	const hasActions: boolean | undefined = actions && actions.length > 0;

	return (
		<Grid container={true} item={true} alignItems="center" justify="space-between">
			<Typography variant="h5">{children}</Typography>
			{hasActions && <PageActions actions={actions} />}
		</Grid>
	);
};

export default withStyles(styles)(PageTitle);
