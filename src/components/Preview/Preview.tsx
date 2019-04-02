import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { ITask } from '../types';
import RestrictionsTable from '../RestrictionsTable';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			width: '100%',
		},
		fields: {
			'& > div:last-child': {
				flex: '3 !important',
			},
			'& > div:nth-child(n + 2)': {
				marginLeft: theme.spacing.unit * 3,
			},
			'& > div:nth-child(n)': {
				flex: 1,
			},
			bottom: theme.spacing.unit * 2,
			display: 'flex',
			position: 'relative',
		},
	});

interface IReviewProps extends WithStyles<typeof styles> {
	values: {
		selectedTasks?: { [id: string]: ITask };
		name?: string;
		tags?: string;
		comment?: string;
	};
}

const Review: FC<IReviewProps> = ({ classes, values }) => {
	return (
		<div className={classes.container}>
			<div className={classes.fields}>
				<TextField disabled={true} label="Название" variant="outlined" value={values.name} />
				<TextField disabled={true} label="Теги" variant="outlined" value={values.tags} />
				<TextField disabled={true} label="Комментарий" variant="outlined" value={values.comment} />
			</div>
			<RestrictionsTable editable={false} tasks={values.selectedTasks} />
		</div>
	);
};

export default withStyles(styles)(Review);
