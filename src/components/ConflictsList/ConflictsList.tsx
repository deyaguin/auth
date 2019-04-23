import React, { FC, ReactNode } from 'react';
import { map } from 'ramda';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			height: '100%',
			minWidth: 300,
		},
		subheader: {
			lineHeight: '24px',
			padding: '12px 16px',
		},
	});

interface IConflictsListProps extends WithStyles<typeof styles> {
	items?: string[];
}

const ConflictsList: FC<IConflictsListProps> = ({ classes, items = [] }) => {
	const renderItem = (item: string): ReactNode => (
		<ListItem button={true} key={item}>
			<Typography variant="body1">{item}</Typography>
		</ListItem>
	);

	return (
		<Paper className={classes.container}>
			<List
				subheader={
					<ListSubheader className={classes.subheader}>
						#Задача/Операция/Состояние/Атрибут/Тип/Условие/Значение
					</ListSubheader>
				}
			>
				{map<string, ReactNode>(renderItem, items)}
			</List>
		</Paper>
	);
};

export default withStyles(styles)(ConflictsList);
