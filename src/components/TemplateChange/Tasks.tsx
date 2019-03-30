import React, { FC } from 'react';
import { omit } from 'ramda';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { ITask, IOperation, IErrors, SetValue } from './types';
import TasksList from './TasksList';

const LIST = 'list';
const SELECTED = 'selected';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			alignItems: 'center',
			display: 'flex',
			height: '100%',
			justifyContent: 'center',
			width: '100%',
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
			margin: theme.spacing.unit * 5,
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
						selected: false,
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
			<div className={classes.container}>
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
				<TasksList
					droppableId={SELECTED}
					tasks={selectedTasksArray}
					subheader="Выбрано:"
					error={Boolean(errors.selectedTasks)}
					setValue={setValue}
					selectedTasks={selectedTasks}
				/>
			</div>
		</DragDropContext>
	);
};

export default withStyles(styles)(Tasks);
