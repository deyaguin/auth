import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import { ITasks, SetValue } from '../types';
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
	tasks: ITasks;
	filters: { [name: string]: string };
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
	setValue: SetValue;
}

const UserRestrictions: FC<IUserRestrictionsProps> = ({
	classes,
	tasks,
	filters,
	setFilters,
	clearFilters,
	setValue,
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
				<RestrictionsTable tasks={tasks} setValue={setValue} editable={true} />
			</Grid>
			<Grid item={true} container={true} justify="center" alignItems="flex-end">
				<Button color="primary" variant="outlined">
					Сохранить
				</Button>
			</Grid>
		</Grid>
	</Fade>
);

export default withStyles(styles)(UserRestrictions);
