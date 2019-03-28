import React, { FC, ReactNode, Fragment, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { TasksType } from './types';

const styles = (theme: Theme) =>
	createStyles({
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

interface ITasksListProps extends WithStyles<typeof styles> {
	subheader: string;
	tasks: TasksType;
}

const TasksList: FC<ITasksListProps> = ({ classes, subheader, tasks }) => (
	<Paper className={classes.paper}>
		<List
			subheader={
				<ListSubheader className={classes.listSubheading}>
					{subheader}
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</ListSubheader>
			}
			className={classes.list}
		>
			{tasks.map(
				(task: {
					id: string;
					name: string;
					operations: Array<{ id: string; name: string; taskId: string }>;
				}) => {
					const [open, setOpen] = useState(false);

					const handleSetOpen = () => {
						setOpen(!open);
					};

					return (
						<Fragment key={task.id}>
							<ListItem button={true} onClick={handleSetOpen}>
								<ListItemText>{task.name}</ListItemText>
								<ListItemIcon>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</ListItemIcon>
							</ListItem>
							<Collapse in={open} timeout="auto" unmountOnExit={true}>
								<List disablePadding={true}>
									{task.operations.map(operation => (
										<ListItem className={classes.nestedListItem} button={true} key={operation.id}>
											<ListItemText>{operation.name}</ListItemText>
										</ListItem>
									))}
								</List>
							</Collapse>
						</Fragment>
					);
				},
			)}
		</List>
	</Paper>
);

export default withStyles(styles)(TasksList);
