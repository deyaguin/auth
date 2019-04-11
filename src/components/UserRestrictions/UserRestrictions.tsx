import React, { FC, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import { ITasks } from '../../types';
import RestrictionsFilter from '../RestrictionsFilter';
import RestrictionsTable from '../RestrictionsTable';

const styles = createStyles({
	container: {
		flexGrow: 1,
	},
	tableWrapper: {
		flexGrow: 1,
	},
});

interface IUserRestrictionsProps extends WithStyles<typeof styles> {
	initialValues: ITasks;
	filters: { [name: string]: string };
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
	actions?: ReactNode;
}

const UserRestrictions: FC<IUserRestrictionsProps> = ({
	classes,
	initialValues,
	filters,
	setFilters,
	clearFilters,
	actions,
}) => (
	<Fade in={true}>
		<Grid
			className={classes.container}
			container={true}
			item={true}
			direction="column"
			spacing={24}
			alignItems="center"
			wrap="nowrap"
		>
			<Grid item={true} container={true}>
				<RestrictionsFilter filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
			</Grid>
			<Grid className={classes.tableWrapper} item={true} container={true}>
				<RestrictionsTable tasks={initialValues} editable={true} />
			</Grid>
			{actions && (
				<Grid item={true} container={true} justify="center" alignItems="flex-end" spacing={16}>
					{actions}
				</Grid>
			)}
		</Grid>
	</Fade>
);

export default withStyles(styles)(UserRestrictions);
