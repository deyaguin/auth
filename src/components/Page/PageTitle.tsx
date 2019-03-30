import React, { FC, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
		<div className={classes.container}>
			<Typography variant="h5">{children}</Typography>
			{hasActions && <PageActions actions={actions} />}
		</div>
	);
};

export default withStyles(styles)(PageTitle);
