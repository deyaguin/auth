import React, { FC, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import { ITasks, IValues } from '../../types';
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
	values: { tasks?: ITasks; tag?: string };
	filters: { [name: string]: string };
	actions?: ReactNode;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
	setRestritionsValues: (values: IValues) => void;
}

const UserRestrictions: FC<IUserRestrictionsProps> = ({
	classes,
	values,
	filters,
	setFilters,
	clearFilters,
	actions,
	setRestritionsValues,
}) => {
	const handleSetTasks = (tasks: IValues) => setRestritionsValues({ ...values, tasks });

	return (
		<Fade in={true} timeout={400}>
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
					<RestrictionsFilter
						filters={filters}
						setFilters={setFilters}
						clearFilters={clearFilters}
					/>
				</Grid>
				<Grid className={classes.tableWrapper} item={true} container={true}>
					<RestrictionsTable tasks={values.tasks} editable={true} setValue={handleSetTasks} />
				</Grid>
				{actions && (
					<Grid item={true} container={true} justify="center" alignItems="flex-end" spacing={16}>
						{actions}
					</Grid>
				)}
			</Grid>
		</Fade>
	);
};

export default withStyles(styles)(UserRestrictions);
