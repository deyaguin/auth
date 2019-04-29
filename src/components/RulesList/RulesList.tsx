import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { map, reduce } from 'ramda';
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

import { CONDITIONS } from '../../constants/ui';
import { IRule, IRuleAttribute } from '../../types';

const HEADER_LIST_TEXT = '#Задача/Операция/Состояние/Атрибут/Тип/Условие/Значение';

const styles = (theme: Theme) =>
	createStyles({
		added: {
			color: green[500],
		},
		buttons: {
			width: 80,
		},
		conflictItem: {
			backgroundColor: red[50],
			borderColor: red[500],
		},
		conflictText: {
			color: red[500],
		},
		container: {
			flexGrow: 1,
			height: '100%',
			maxWidth: 300,
			overflowX: 'hidden',
			overflowY: 'auto',
			width: 300,
		},
		removed: {},
		selectedItem: {
			backgroundColor: green[50],
			borderColor: green[500],
		},
		selectedText: {
			color: green[500],
		},
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
	const renderActions = (rule: IRule): ReactNode => (
		<Grid className={classes.buttons} container={true} item={true} direction="column">
			<Grid item={true}>
				<Tooltip title="Добавить">
					<div>
						<Button onClick={onAdd(rule)} disabled={rule.selected} color="primary">
							<AddIcon />
						</Button>
					</div>
				</Tooltip>
			</Grid>
			<Grid item={true}>
				<Tooltip title="Удалить">
					<div>
						<Button onClick={onRemove(rule)} disabled={!rule.selected} color="secondary">
							<RemoveIcon />
						</Button>
					</div>
				</Tooltip>
			</Grid>
		</Grid>
	);

	const renderRule = (rule: IRule): ReactNode => {
		const attributes: string[] = reduce<IRuleAttribute, string[]>(
			(accAtributes: string[], attributeValue: IRuleAttribute) => [
				...accAtributes,
				`${attributeValue.key}/${CONDITIONS[attributeValue.condition as string]}/${
					attributeValue.values
				}`,
			],
			[] as string[],
			rule.attributes,
		);

		return (
			<ListItem
				className={classNames({
					[classes.conflictItem]: rule.conflicted,
					[classes.selectedItem]: rule.selected,
				})}
				divider={true}
				key={rule.text}
			>
				<Grid container={true} spacing={16} wrap="nowrap" alignItems="center">
					{buttonPosition === 'left' && renderActions(rule)}
					<Grid item={true}>
						<Typography
							className={classNames({
								[classes.conflictText]: rule.conflicted,
								[classes.selectedText]: rule.selected,
							})}
						>
							{rule.text}
						</Typography>
						{map<string, ReactNode>(
							attribute => (
								<Typography
									variant="caption"
									className={classNames({
										[classes.conflictText]: rule.conflicted,
										[classes.selectedText]: rule.selected,
									})}
									key={attribute}
								>
									{attribute}
								</Typography>
							),
							attributes,
						)}
					</Grid>
					{buttonPosition === 'right' && renderActions(rule)}
				</Grid>
			</ListItem>
		);
	};

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
