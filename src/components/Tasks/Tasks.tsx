import React, { FC } from 'react';
import { omit } from 'ramda';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

import { ITask, IOperation, IErrors, SetValue } from '../types';
import TasksList from './TasksList';

const LIST = 'list';
const SELECTED = 'selected';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			flexGrow: 1,
		},
		list: {
			width: '100%',
		},
		listSubheading: {
			display: 'flex',
			justifyContent: 'space-between',
			paddingRight: theme.spacing.unit * 2.5,
		},
		nestedListItem: {
			paddingLeft: theme.spacing.unit * 3,
		},
		paper: {
			minWidth: 360,
		},
	});

interface ITasksProps extends WithStyles<typeof styles> {
	setValue: SetValue;
	errors: IErrors;
	selectedTasks: { [name: string]: any };
	tasks: ITask[];
}

const Tasks: FC<ITasksProps> = ({ classes, selectedTasks = {}, setValue, tasks, errors }) => {
	const handleSelectTask = ({ destination, source, draggableId }: DropResult): void => {
		if (source.droppableId === LIST && destination && destination.droppableId === SELECTED) {
			const filteredTask: ITask = tasks.filter((item: ITask) => item.id === draggableId)[0];

			setValue('selectedTasks', {
				...selectedTasks,
				[draggableId]: {
					...filteredTask,
					operations: filteredTask.operations.map((item: IOperation) => ({
						...item,
						selected: true,
					})),
				},
			});
		}

		if (source.droppableId === SELECTED && destination && destination.droppableId === LIST) {
			setValue('selectedTasks', omit([draggableId], selectedTasks));
		}
	};

	const selectedTasksArray: ITask[] = Object.keys(selectedTasks).map(
		(key: string) => selectedTasks[key],
	);

	return (
		<DragDropContext onDragEnd={handleSelectTask}>
			<Fade in={true} timeout={400}>
				<Grid className={classes.container} container={true} spacing={24} wrap="nowrap">
					<Grid container={true} item={true}>
						<TasksList
							droppableId={LIST}
							tasks={tasks.reduce((acc: ITask[], item: ITask) => {
								if (selectedTasks[item.id]) {
									return acc;
								}

								return [...acc, item];
							}, [])}
							subheader="Список задач:"
						/>
					</Grid>
					<Grid container={true} item={true}>
						<TasksList
							droppableId={SELECTED}
							tasks={selectedTasksArray}
							subheader="Выбрано:"
							error={Boolean(errors.selectedTasks)}
							setValue={setValue}
							selectedTasks={selectedTasks}
						/>
					</Grid>
				</Grid>
			</Fade>
		</DragDropContext>
	);
};

export default withStyles(styles)(Tasks);
