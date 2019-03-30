import React, { Component, ReactNode, ChangeEvent } from 'react';
import classNames from 'classnames';
import { Draggable, Droppable, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { ITask, IOperation, SetValue } from './types';

const styles = (theme: Theme) =>
	createStyles({
		filterInput: {
			margin: `${theme.spacing.unit}px 0`,
		},
		list: {
			display: 'flex',
			flex: 1,
			flexDirection: 'column',
			overflow: 'auto',
			width: '100%',
		},
		listFooter: {
			padding: theme.spacing.unit * 2,
		},
		listFooterError: {
			color: theme.palette.error.main,
		},
		listItem: {
			display: 'flex',
			flexDirection: 'column',
		},
		listItemContent: {
			display: 'flex',
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '100%',
		},
		listSubheading: {
			backgroundColor: '#FFFFFF',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			paddingRight: theme.spacing.unit * 2.5,
		},
		listSubheadingTitle: {
			display: 'flex',
			justifyContent: 'space-between',
		},
		listWrapper: {
			flex: 1,
		},
		nestedListItem: {
			display: 'flex',
			justifyContent: 'space-between',
			paddingLeft: theme.spacing.unit * 3,
		},
		operationsListCollapse: {
			width: '100%',
		},
		paper: {
			display: 'flex',
			flexDirection: 'column',
			height: 470,
			justifyContent: 'space-between',
			margin: theme.spacing.unit * 5,
			minWidth: 360,
		},
	});

interface ITasksListProps extends WithStyles<typeof styles> {
	subheader: string;
	tasks: ITask[];
	droppableId: string;
	error?: boolean;
	setValue?: SetValue;
	selectedTasks?: { [id: string]: ITask };
}

interface ITasksListState {
	filterIsVisible: boolean;
	filterValue: string;
	collapsedTasks: { [name: string]: boolean };
	count: number;
}

class TasksList extends Component<ITasksListProps, ITasksListState> {
	public constructor(props: ITasksListProps) {
		super(props);

		this.state = {
			collapsedTasks: {},
			count: props.tasks.length,
			filterIsVisible: false,
			filterValue: '',
		};
	}

	public componentWillReceiveProps(props: ITasksListProps) {
		this.setState({ count: props.tasks.length });
	}

	public render() {
		const { classes, droppableId, subheader } = this.props;
		const { filterIsVisible } = this.state;

		return (
			<Paper className={classes.paper}>
				<List
					className={classes.list}
					subheader={
						<ListSubheader className={classes.listSubheading}>
							<div className={classes.listSubheadingTitle}>
								{subheader}
								<Tooltip title="Фильтрация">
									<IconButton
										color={filterIsVisible ? 'primary' : 'default'}
										onClick={this.handleSetFilterIsVisible}
									>
										<FilterListIcon />
									</IconButton>
								</Tooltip>
							</div>
							{this.renderFilterListItem()}
						</ListSubheader>
					}
				>
					<Droppable droppableId={droppableId}>
						{(provided: DroppableProvided) => (
							<div className={classes.listWrapper} ref={provided.innerRef}>
								{this.renderTasks()}
							</div>
						)}
					</Droppable>
				</List>
				{this.renderListFooter()}
			</Paper>
		);
	}

	private handleFilterTask = (filterValue: string) => (task: ITask): boolean =>
		task.name.toLowerCase().includes(filterValue.toLowerCase());

	private handleSetOpen = (id: string) => (): void => {
		const { collapsedTasks } = this.state;

		this.setState({ collapsedTasks: { ...collapsedTasks, [id]: !collapsedTasks[id] } });
	};

	private handleSetFilterIsVisible = (): void => {
		const { filterIsVisible } = this.state;

		this.setState({ filterIsVisible: !filterIsVisible });
	};

	private handleSetFilterValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const { tasks } = this.props;

		this.setState({
			count: tasks.filter(this.handleFilterTask(e.currentTarget.value)).length,
			filterValue: e.currentTarget.value,
		});
	};

	private handleSetValue = (taskId: string, operationId: string) => (): void => {
		const { setValue } = this.props;

		if (setValue) {
			// todo
			setValue('selectedTasks', {});
		}
	};

	private renderTasks = (): ReactNode => {
		const { tasks } = this.props;
		const { filterValue } = this.state;

		const renderedTasks: ReactNode[] = tasks
			.filter(this.handleFilterTask(filterValue))
			.map(this.renderListItem);

		return renderedTasks;
	};

	private renderFilterListItem = (): ReactNode => {
		const { classes } = this.props;
		const { filterValue, filterIsVisible } = this.state;

		return filterIsVisible ? (
			<Input
				className={classes.filterInput}
				placeholder="Фильтр"
				fullWidth={true}
				value={filterValue}
				onChange={this.handleSetFilterValue}
			/>
		) : null;
	};

	private renderListFooter = (): ReactNode => {
		const { classes, tasks, error } = this.props;
		const { count } = this.state;

		return (
			<Typography
				className={classNames(classes.listFooter, { [classes.listFooterError]: error })}
				variant="caption"
			>
				{count > 0 ? `Показано ${count} из ${tasks.length}` : error && 'Необходимо выбрать задачи'}
			</Typography>
		);
	};

	private renderOperationsList = (task: ITask): ReactNode => {
		const { classes, setValue, selectedTasks } = this.props;
		const { collapsedTasks } = this.state;

		return (
			<Collapse
				className={classes.operationsListCollapse}
				in={collapsedTasks[task.id]}
				timeout="auto"
				unmountOnExit={true}
			>
				<List disablePadding={true}>
					{task.operations.map(operation => (
						<ListItem
							onClick={this.handleSetValue(task.id, operation.id)}
							className={classes.nestedListItem}
							button={true}
							key={operation.id}
						>
							{setValue && selectedTasks && (
								<ListItemIcon>
									<Checkbox
										checked={
											selectedTasks[task.id].operations.filter(
												(item: IOperation) => item.id === operation.id,
											)[0].selected
										}
										onChange={this.handleSetValue(task.id, operation.id)}
									/>
								</ListItemIcon>
							)}
							<ListItemText>{operation.name}</ListItemText>
						</ListItem>
					))}
				</List>
			</Collapse>
		);
	};

	private renderListItem = (task: ITask, i: number): ReactNode => {
		const { classes } = this.props;
		const { collapsedTasks } = this.state;

		return (
			<Draggable key={task.id} draggableId={task.id} index={i}>
				{(provided: DraggableProvided) => (
					<div ref={provided.innerRef}>
						<ListItem
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							divider={true}
							button={true}
							onClick={this.handleSetOpen(task.id)}
							className={classes.listItem}
						>
							<div className={classes.listItemContent}>
								<ListItemText>{task.name}</ListItemText>
								<ListItemIcon>
									{collapsedTasks[task.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
								</ListItemIcon>
							</div>
							{this.renderOperationsList(task)}
						</ListItem>
					</div>
				)}
			</Draggable>
		);
	};
}

export default withStyles(styles)(TasksList);
