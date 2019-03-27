import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles({
	container: {},
});

interface ITasksProps extends WithStyles<typeof styles> {}

const Tasks: FC<ITasksProps> = () => <div>Tasks</div>;

export default withStyles(styles)(Tasks);
