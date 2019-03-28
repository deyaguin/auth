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
import TasksList from './TasksList';

const styles = (theme: Theme) =>
	createStyles({
		container: {
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
	values: { [name: string]: any };
	tasks: TasksType;
}

const Tasks: FC<ITasksProps> = ({ classes, values, setValue, tasks }) => {
	return (
		<div className={classes.container}>
			<TasksList tasks={tasks} subheader="Список задач:" />
			<TasksList tasks={tasks} subheader="Выбрано:" />
		</div>
	);
};

export default withStyles(styles)(Tasks);
