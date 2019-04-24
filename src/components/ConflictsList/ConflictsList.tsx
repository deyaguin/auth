import React, { FC, ReactNode } from 'react';
import { map } from 'ramda';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import commomColor from '@material-ui/core/colors/common';

import { IRule } from '../../types';
const HEADER_LIST = '#Задача/Операция/Состояние/Атрибут/Тип/Условие/Значение';

const styles = (theme: Theme) =>
	createStyles({
		added: {
			color: green[500],
		},
		buttons: {
			width: 80,
		},
		conflict: {
			color: red[500],
		},
		container: {
			flexGrow: 1,
			height: '100%',
			minWidth: 300,
			overflowX: 'hidden',
			overflowY: 'auto',
		},
		removed: {},
		subheader: {
			backgroundColor: commomColor.white,
			height: 56,
			lineHeight: '24px',
			padding: '12px 16px',
		},
	});

interface IConflictsListProps extends WithStyles<typeof styles> {
	items?: IRule[];
	buttonPosition?: string;
}

const ConflictsList: FC<IConflictsListProps> = ({
	classes,
	items = [],
	buttonPosition = 'right',
}) => {
	const renderActions = (add: boolean, remove: boolean): ReactNode => (
		<Grid className={classes.buttons} container={true} item={true} direction="column">
			<Grid item={true}>
				<Tooltip title="Добавить">
					<div>
						<Button disabled={add} color="primary">
							<AddIcon />
						</Button>
					</div>
				</Tooltip>
			</Grid>
			<Grid item={true}>
				<Tooltip title="Удалить">
					<div>
						<Button disabled={remove} color="secondary">
							<RemoveIcon />
						</Button>
					</div>
				</Tooltip>
			</Grid>
		</Grid>
	);

	const renderItem = (item: IRule): ReactNode => (
		<ListItem divider={true} key={item.text}>
			<Grid container={true} spacing={16} wrap="nowrap" alignItems="center">
				{buttonPosition === 'left' && renderActions(true, false)}
				<Grid item={true}>
					<Typography variant="body2">{item.text}</Typography>
				</Grid>
				{buttonPosition === 'right' && renderActions(true, false)}
			</Grid>
		</ListItem>
	);

	return (
		<Paper className={classes.container}>
			<List
				subheader={
					<ListSubheader className={classes.subheader}>
						<Typography variant="caption">{HEADER_LIST}</Typography>
					</ListSubheader>
				}
			>
				{map<IRule, ReactNode>(renderItem, items)}
			</List>
		</Paper>
	);
};

export default withStyles(styles)(ConflictsList);
