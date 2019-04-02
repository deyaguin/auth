import React, { FC, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { ITask } from '../types';
import RestrictionsTable from '../RestrictionsTable';

const styles = createStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
});

interface IReviewProps extends WithStyles<typeof styles> {
	values: {
		selectedTasks?: { [id: string]: ITask };
	};
}

const Review: FC<IReviewProps> = ({ classes, values }) => {
	return (
		<div className={classes.container}>
			<RestrictionsTable editable={false} tasks={values.selectedTasks} />
		</div>
	);
};

export default withStyles(styles)(Review);
