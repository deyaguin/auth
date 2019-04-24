import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
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

const HEADER_LIST_TEXT = '#Задача/Операция/Состояние/Атрибут/Тип/Условие/Значение';

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
	rules?: IRule[];
	buttonPosition?: string;
	onAdd: (rule: IRule) => () => void;
	onRemove: (rule: IRule) => () => void;
}

const ConflictsList: FC<IConflictsListProps> = ({
	classes,
	rules = [],
	buttonPosition = 'right',
	onAdd,
	onRemove,
}) => {
	console.log(rules);
	const renderActions = (add: boolean, remove: boolean, rule: IRule): ReactNode => (
		<Grid className={classes.buttons} container={true} item={true} direction="column">
			<Grid item={true}>
				<Tooltip title="Добавить">
					<div>
						<Button onClick={onAdd(rule)} disabled={add} color="primary">
							<AddIcon />
						</Button>
					</div>
				</Tooltip>
			</Grid>
			<Grid item={true}>
				<Tooltip title="Удалить">
					<div>
						<Button onClick={onRemove(rule)} disabled={remove} color="secondary">
							<RemoveIcon />
						</Button>
					</div>
				</Tooltip>
			</Grid>
		</Grid>
	);

	const renderRule = (rule: IRule): ReactNode => (
		<ListItem divider={true} key={rule.text}>
			<Grid container={true} spacing={16} wrap="nowrap" alignItems="center">
				{buttonPosition === 'left' && renderActions(true, false, rule)}
				<Grid item={true}>
					<Typography
						className={classNames({
							[classes.conflict]: rule.conflicted,
						})}
						variant="body2"
					>
						{rule.text}
					</Typography>
				</Grid>
				{buttonPosition === 'right' && renderActions(true, false, rule)}
			</Grid>
		</ListItem>
	);

	return (
		<Paper className={classes.container}>
			<List
				subheader={
					<ListSubheader className={classes.subheader}>
						<Typography variant="caption">{HEADER_LIST_TEXT}</Typography>
					</ListSubheader>
				}
			>
				{map<IRule, ReactNode>(renderRule, rules)}
			</List>
		</Paper>
	);
};

export default withStyles(styles)(ConflictsList);
