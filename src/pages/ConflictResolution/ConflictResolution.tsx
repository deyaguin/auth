import React, { FC, useState, useEffect, ReactNode } from 'react';
import { reduce, map, compose } from 'ramda';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';

import { CONDITIONS, OPERATION_STATES } from '../../constants/ui';
import {
	IUser,
	ITasks,
	ITask,
	ITemplate,
	IOperation,
	IValues,
	IAttribute,
	IRule,
} from '../../types';
import { Page, RestrictionsTable, RestrictionsFilter, ConflictsList } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
		button: {
			minWidth: 260,
		},
		container: {
			padding: theme.spacing.unit * 3,
		},
		content: {
			flexGrow: 1,
		},
		link: {
			textDecoration: 'none',
		},
		resultContainer: {
			height: '100%',
		},
		rulesContainer: {
			height: '100%',
		},
	});

interface IConflictResolutionProps extends WithStyles<typeof styles>, RouteComponentProps {
	selectedUsers: string[];
	selectedTemplates: string[];
	getUser: (id: string) => IUser;
	getTemplate: (id: string) => ITemplate;
	setSelectedUsers: (users: string[]) => void;
	setSelectedTemplates: (templates: string[]) => void;
}

const ConflictResolution: FC<IConflictResolutionProps> = ({
	classes,
	history,
	location,
	getUser,
	getTemplate,
	selectedUsers,
	selectedTemplates,
	setSelectedUsers,
	setSelectedTemplates,
}) => {
	const tasksToRules = reduce<ITask, IRule[]>(
		(accTasks: IRule[], taskValue: ITask) => [
			...accTasks,
			...reduce<IOperation, IRule[]>(
				(accOperations: IRule[], operationValue: IOperation) => [
					...accOperations,
					...map((attributeValue: IAttribute) => {
						const result: IRule = {
							operation: operationValue.id,
							task: taskValue.id,
							text: `${taskValue.name}/${operationValue.name}/${
								OPERATION_STATES[operationValue.state as string]
							}/${attributeValue.title}`,
						};

						if (operationValue.state) {
							result.state = operationValue.state;
						}

						if (attributeValue.condition && attributeValue.values) {
							result.text = `${taskValue.name}/${operationValue.name}/${
								OPERATION_STATES[operationValue.state as string]
							}/${attributeValue.title}/${CONDITIONS[attributeValue.condition]}/${
								attributeValue.values
							}`;
							result.attribute = attributeValue.key;
							result.condition = attributeValue.condition;
							result.values = attributeValue.values;
						}

						return result;
					}, operationValue.attributes),
				],
				[] as IRule[],
				taskValue.operations,
			),
		],
		[] as IRule[],
	);

	const [initialized, setInitialized]: [boolean, (initialized: boolean) => void] = useState(false);

	const [tasks, setTasks]: [IValues, (tasks: IValues) => void] = useState({});

	const { users: queryUsers, templates: queryTemplates, vaitant: queryVariant } = queryString.parse(
		location.search,
	);

	if (!initialized) {
		setInitialized(true);

		if (typeof queryUsers === 'string') {
			setSelectedUsers([queryUsers]);
		} else {
			setSelectedUsers(queryUsers || []);
		}

		if (typeof queryTemplates === 'string') {
			setSelectedTemplates([queryTemplates]);
		} else {
			setSelectedTemplates(queryTemplates || []);
		}
	}

	const [currentUserNumber, setCurrentUserNumber]: [
		number,
		(currentUserNumber: number) => void
	] = useState(0);

	const currentUser: IUser = getUser(selectedUsers[currentUserNumber]);

	const handleSetTasks = (): void =>
		setTasks(
			reduce(
				(acc: ITasks, item: ITask) => ({
					...acc,
					[item.id]: {
						...item,
						operations: map(
							(operation: IOperation) => ({ ...operation, selected: true }),
							item.operations,
						),
					},
				}),
				{},
				currentUser ? currentUser.tasks || [] : [],
			),
		);

	const handleApply = (): void => {
		setCurrentUserNumber(currentUserNumber + 1);
	};

	const handleClose = (): void => history.goBack();

	useEffect(() => {
		handleSetTasks();
	}, [currentUserNumber]);

	useEffect(() => {
		handleSetTasks();
	}, [selectedUsers]);

	const templates = map<string, ITemplate>(item => getTemplate(item), selectedTemplates);

	const currentRules: IRule[] = tasksToRules(currentUser ? currentUser.tasks || [] : []);

	const assignedRules: IRule[] = tasksToRules(templates[0] ? templates[0].tasks : []);

	const renderHeader = (): ReactNode => (
		<Grid container={true} item={true} justify="space-between">
			<Grid item={true}>
				<Typography variant="subheading">
					Пользователь: {currentUser && currentUser.login}
				</Typography>
			</Grid>
			<Grid item={true}>
				<Typography variant="subheading">
					Обработано: {currentUserNumber} из {selectedUsers.length}
				</Typography>
			</Grid>
		</Grid>
	);

	if (currentRules && assignedRules) {
		console.log(currentRules);
		console.log(assignedRules);
	}

	const renderContent = (): ReactNode => (
		<Grid className={classes.content} container={true} item={true} wrap="nowrap" spacing={24}>
			<Grid item={true} container={true} direction="column" wrap="nowrap">
				<Grid item={true}>
					<Typography variant="subheading">Текущие права:</Typography>
				</Grid>
				<Grid className={classes.rulesContainer} item={true}>
					<ConflictsList items={currentRules} />
				</Grid>
			</Grid>
			<Grid
				item={true}
				container={true}
				direction="column"
				wrap="nowrap"
				className={classes.resultContainer}
			>
				<Grid item={true}>
					<Typography variant="subheading">Результат применения шаблона:</Typography>
				</Grid>
				<Grid container={true} item={true} className={classes.resultContainer}>
					<RestrictionsTable tasks={tasks} />
				</Grid>
			</Grid>
			<Grid item={true} container={true} direction="column" wrap="nowrap">
				<Grid item={true}>
					<Typography variant="subheading">Применяемые права:</Typography>
				</Grid>
				<Grid className={classes.rulesContainer} item={true} container={true}>
					<ConflictsList items={assignedRules} buttonPosition="left" />
				</Grid>
			</Grid>
		</Grid>
	);

	const renderActions = (): ReactNode => (
		<Grid container={true} item={true} spacing={24} justify="center">
			<Grid item={true}>
				<Button onClick={handleApply} className={classes.button} variant="outlined" color="primary">
					Применить
				</Button>
			</Grid>
			<Grid item={true}>
				<Button onClick={handleApply} className={classes.button} variant="outlined" color="primary">
					Пропустить конфликты и применить
				</Button>
			</Grid>
			<Grid item={true}>
				<Button
					onClick={handleApply}
					className={classes.button}
					variant="outlined"
					color="secondary"
				>
					Сбросить
				</Button>
			</Grid>
		</Grid>
	);

	return (
		<Page
			actions={[
				<Button key="close" variant="contained" color="primary" onClick={handleClose}>
					Закрыть
				</Button>,
			]}
			headerTitle="Предварительный результат"
		>
			<Grid
				className={classes.container}
				container={true}
				direction="column"
				spacing={24}
				wrap="nowrap"
			>
				{renderHeader()}
				{renderContent()}
				{renderActions()}
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(ConflictResolution);
