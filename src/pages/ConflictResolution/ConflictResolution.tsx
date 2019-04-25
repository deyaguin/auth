import React, { FC, useState, useEffect, ReactNode } from 'react';
import { reduce, map, forEach, filter, clone, omit } from 'ramda';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';

import { CONFLICT_RESOLUTION_VARIANTS } from '../../constants';
import { OPERATION_STATES } from '../../constants/ui';
import {
	IUser,
	ITasks,
	ITask,
	ITemplate,
	IOperation,
	IAttribute,
	IRule,
	IRuleAttribute,
} from '../../types';
import { Page, RestrictionsTable, RestrictionsFilter, RulesList } from '../../components';

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
	const { users: queryUsers, templates: queryTemplates, variant: queryVariant } = queryString.parse(
		location.search,
	);

	const isAdd: boolean = queryVariant === CONFLICT_RESOLUTION_VARIANTS.ADD;

	const isOverwrite: boolean = queryVariant === CONFLICT_RESOLUTION_VARIANTS.OVERWRITE;

	const isOverwritePartially: boolean =
		queryVariant === CONFLICT_RESOLUTION_VARIANTS.OVERWRITE_PARTIALLY;

	const tasksToRules = reduce<ITask, IRule[]>(
		(accRules: IRule[], taskValue: ITask) => [
			...accRules,
			...reduce<IOperation, IRule[]>(
				(accOperations: IRule[], operationValue: IOperation) => {
					const attributes: IRuleAttribute[] = map<IAttribute, IRuleAttribute>(
						(attributeValue: IAttribute) => ({
							condition: attributeValue.condition,
							key: attributeValue.key,
							values: attributeValue.values,
						}),
						operationValue.attributes,
					);

					const result: IRule = {
						attributes,
						conflicted: false,
						operation: operationValue.id,
						task: taskValue.id,
						text: `${taskValue.name}/${operationValue.name}/${
							OPERATION_STATES[operationValue.state as string]
						}`,
					};

					if (operationValue.state) {
						result.state = operationValue.state;
					}

					return [...accOperations, result];
				},
				[] as IRule[],
				taskValue.operations,
			),
		],
		[] as IRule[],
	);

	const rulesToTasks = reduce<IRule, ITask[]>(
		(accTasks: ITask[], ruleValue: IRule) => {
			return [...accTasks];
		},
		[] as ITask[],
	);

	const tasksToObject = reduce(
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
	);

	const compareRules = (current: IRule[], assigned: IRule[]): void => {
		/*console.log(current);
		console.log(assigned);
		console.log(tasks);*/
	};

	const [initialized, setInitialized]: [boolean, (initialized: boolean) => void] = useState(false);

	const [tasks, setTasks]: [ITasks, (tasks: ITasks) => void] = useState({});

	const [currentRulesState, setCurrentRulesState]: [IRule[], ((rules: IRule[]) => void)] = useState(
		[] as IRule[],
	);

	const [assignedRulesState, setAssignedRulesState]: [
		IRule[],
		((rules: IRule[]) => void)
	] = useState([] as IRule[]);

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

	const templates = map<string, ITemplate>(item => getTemplate(item), selectedTemplates);

	const handleSetTasks = (tasksArr: ITask[]): void => setTasks(tasksToObject(tasksArr));

	const handleApply = (): void => {
		setCurrentUserNumber(currentUserNumber + 1);
	};

	useEffect(() => {
		if (isAdd) {
			if (templates[0] && templates[0].tasks) {
				handleSetTasks(templates[0].tasks);
			}
		}
	}, [currentUserNumber]);

	useEffect(() => {
		if (isOverwrite) {
			if (templates[0] && templates[0].tasks) {
				handleSetTasks(templates[0].tasks);
			}
		}
	}, [selectedTemplates]);

	useEffect(() => {
		if (currentUser && templates[0] && currentUser.tasks && templates[0].tasks) {
			const currentRules: IRule[] = tasksToRules(currentUser.tasks || []);
			const assignedRules: IRule[] = tasksToRules(templates[0].tasks);

			if (isAdd) {
				setCurrentRulesState(
					map<IRule, IRule>((currentRule: IRule) => {
						const rule: IRule = clone(currentRule);
						forEach((assignedRule: IRule) => {
							if (
								rule.task === assignedRule.task &&
								rule.operation === assignedRule.operation &&
								rule.state !== assignedRule.state
							) {
								rule.conflicted = true;
							}
						}, assignedRules);

						return rule;
					}, currentRules),
				);

				setAssignedRulesState(
					map<IRule, IRule>((assignedRule: IRule) => {
						const rule: IRule = clone(assignedRule);
						forEach((currentRule: IRule) => {
							if (
								rule.task === currentRule.task &&
								rule.operation === currentRule.operation &&
								rule.state !== currentRule.state
							) {
								rule.conflicted = true;
							}
						}, currentRules);

						return rule;
					}, assignedRules),
				);
			} else {
				setCurrentRulesState(currentRules);

				setAssignedRulesState(assignedRules);
			}
		}
	}, [selectedUsers, selectedTemplates, tasks]);

	const compareOperations = (operation: IOperation, rule: IRule): boolean => {
		let isEquals: boolean = false;

		forEach((attributeValue: IAttribute) => {
			forEach((ruleAttributeValue: IRuleAttribute) => {
				if (
					attributeValue.condition === ruleAttributeValue.condition &&
					attributeValue.key === ruleAttributeValue.key &&
					attributeValue.values === ruleAttributeValue.values
				) {
					isEquals = true;
				}
			}, rule.attributes);
		}, operation.attributes);

		return operation.id === rule.operation && operation.state === rule.state && isEquals;
	};

	useEffect(() => {
		setCurrentRulesState(
			map<IRule, IRule>(currentRule => {
				let selected: boolean = false;

				const task: ITask = tasks[currentRule.task];

				if (task) {
					const operation: IOperation = filter((operationValue: IOperation) => {
						return compareOperations(operationValue, currentRule);
					}, task.operations)[0];

					if (operation) {
						selected = true;
					}
				}

				return { ...currentRule, selected };
			}, currentRulesState),
		);

		setAssignedRulesState(
			map<IRule, IRule>(assignedRule => {
				let selected: boolean = false;

				const task: ITask = tasks[assignedRule.task];

				if (task) {
					const operation: IOperation = filter((operationValue: IOperation) => {
						return compareOperations(operationValue, assignedRule);
					}, task.operations)[0];

					if (operation) {
						selected = true;
					}
				}

				return { ...assignedRule, selected };
			}, assignedRulesState),
		);
	}, [tasks]);

	if (currentRulesState && assignedRulesState) {
		compareRules(currentRulesState, assignedRulesState);
	}

	const handleClose = (): void => history.goBack();

	const handleRemoveCurrent = (rule: IRule) => (): void => {};

	const handleRemoveAssigned = (rule: IRule) => (): void => {
		const task: ITask = tasks[rule.task];
		const operations: IOperation[] = task.operations;

		setTasks({
			...tasks,
			[task.id]: {
				...task,
				operations: reduce<IOperation, IOperation[]>(
					(accOperations, operationValue) => {
						if (compareOperations(operationValue, rule)) {
							return accOperations;
						}

						return [...accOperations, operationValue];
					},
					[],
					operations,
				),
			},
		});
	};

	const handleAddCurrent = (rule: IRule) => (): void => {
		console.log(rule);
	};

	const handleAddAssigned = (rule: IRule) => (): void => {
		const task: ITask = tasks[rule.task];
		const operations: IOperation[] = task.operations;
		const operation: IOperation = filter<IOperation>(
			operationValue => operationValue.id === rule.operation,
			filter<ITask>(taskValue => taskValue.id === rule.task, templates[0].tasks)[0].operations,
		)[0];

		setTasks({
			...tasks,
			[task.id]: {
				...task,
				operations: [...operations, { ...operation, selected: true }],
			},
		});
	};

	console.log(tasks);

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

	const renderContent = (): ReactNode => (
		<Grid className={classes.content} container={true} item={true} wrap="nowrap" spacing={24}>
			<Grid item={true} container={true} direction="column" wrap="nowrap">
				<Grid item={true}>
					<Typography variant="subheading">Текущие права:</Typography>
				</Grid>
				<Grid className={classes.rulesContainer} item={true}>
					<RulesList
						onAdd={handleAddCurrent}
						onRemove={handleRemoveCurrent}
						rules={currentRulesState}
					/>
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
					<RestrictionsTable tasks={tasks} setValue={setTasks} />
				</Grid>
			</Grid>
			<Grid item={true} container={true} direction="column" wrap="nowrap">
				<Grid item={true}>
					<Typography variant="subheading">Применяемые права:</Typography>
				</Grid>
				<Grid className={classes.rulesContainer} item={true} container={true}>
					<RulesList
						onAdd={handleAddAssigned}
						onRemove={handleRemoveAssigned}
						rules={assignedRulesState}
						buttonPosition="left"
					/>
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
