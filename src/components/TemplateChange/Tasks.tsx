import React, { FC } from 'react';
import { omit, without } from 'ramda';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { ITask } from './types';
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
	setValue: (key: string, value: any) => void;
	errors: { [name: string]: boolean };
	selectedTasks: { [name: string]: any };
	tasks: ITask[];
}

const Tasks: FC<ITasksProps> = ({ classes, selectedTasks = {}, setValue, tasks }) => {
	const handleSelectTask = ({ destination, source, draggableId }: DropResult): void => {
		if (source.droppableId === LIST && destination && destination.droppableId === SELECTED) {
			setValue('selectedTasks', {
				...selectedTasks,
				[draggableId]: tasks.filter((item: ITask) => item.id === draggableId)[0],
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
					tasks={without(selectedTasksArray, tasks)}
					subheader="Список задач:"
				/>
				<TasksList droppableId={SELECTED} tasks={selectedTasksArray} subheader="Выбрано:" />;
			</div>
		</DragDropContext>
	);
};

export default withStyles(styles)(Tasks);
