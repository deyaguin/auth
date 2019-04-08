import React, { FC, ReactNode } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import PageActions from './PageActions';

interface IPageTitleProps {
	children: ReactNode | string;
	actions?: ReactNode[];
}

const PageTitle: FC<IPageTitleProps> = ({ children, actions }) => {
	const hasActions: boolean | undefined = actions && actions.length > 0;

	return (
		<Grid container={true} item={true} alignItems="center" justify="space-between">
			<Typography variant="h5">{children}</Typography>
			{hasActions && <PageActions actions={actions} />}
		</Grid>
	);
};

export default PageTitle;
