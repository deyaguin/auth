// todo save tasks order

import React, { FC } from 'react';
import { omit, map, filter, reduce, compose, keys } from 'ramda';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

import { ITask, ITasks, IOperation, IValues } from '../../types';
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
	setValue: (tasksValues: IValues) => void;
	selectedTasks: { [name: string]: any };
	tasks: ITask[];
}

const Tasks: FC<ITasksProps> = ({ classes, selectedTasks = {}, setValue, tasks }) => {
	const handleSelectTask = ({ destination, source, draggableId }: DropResult): void => {
		if (source.droppableId === LIST && destination && destination.droppableId === SELECTED) {
			const filteredTask: ITask = filter((item: ITask) => item.id === draggableId, tasks)[0];

			setValue({
				...selectedTasks,
				[draggableId]: {
					...filteredTask,
					operations: map(
						(item: IOperation) => ({
							...item,
							selected: true,
						}),
						filteredTask.operations,
					),
				},
			});
		}

		if (source.droppableId === SELECTED && destination && destination.droppableId === LIST) {
			setValue(omit([draggableId], selectedTasks));
		}
	};

	const getSelectedTasksArray: (tasks: ITasks) => ITask[] = compose(
		map((key: string) => selectedTasks[key]),
		keys,
	);

	return (
		<DragDropContext onDragEnd={handleSelectTask}>
			<Fade in={true} timeout={400}>
				<Grid className={classes.container} container={true} spacing={24} wrap="nowrap">
					<Grid container={true} item={true}>
						<TasksList
							droppableId={LIST}
							tasks={reduce<ITask, ITask[]>(
								(acc: ITask[], item: ITask) => (selectedTasks[item.id] ? acc : [...acc, item]),
								[],
								tasks,
							)}
							subheader="Список задач:"
						/>
					</Grid>
					<Grid container={true} item={true}>
						<TasksList
							droppableId={SELECTED}
							tasks={getSelectedTasksArray(selectedTasks)}
							subheader="Выбрано:"
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
