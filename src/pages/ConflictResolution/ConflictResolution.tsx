// todo refact this component

import React, { FC, useState, useEffect, ReactNode } from 'react';
import { reduce, map, forEach, filter, clone, propEq, findIndex, remove, find } from 'ramda';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';

import { CONFLICT_RESOLUTION_VARIANTS } from '../../constants';
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
import {
	tasksToRules,
	tasksToObject,
	compareOperationRuleStrict,
	onRemoveOperationOverwrite,
	onSelectOperationOverwrite,
	onSelectOperation,
	onRemoveOperation,
} from './utils';

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
		rulesContainerWrapper: {
			boxSizing: 'initial',
			width: 300,
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

	const [initialized, setInitialized]: [boolean, (initialized: boolean) => void] = useState(false);

	const [tasks, setTasks]: [ITasks, (tasks: ITasks) => void] = useState({});

	const [currentRulesState, setCurrentRulesState]: [IRule[], ((rules: IRule[]) => void)] = useState(
		[] as IRule[],
	);

	const [assignedRulesState, setAssignedRulesState]: [
		IRule[],
		((rules: IRule[]) => void)
	] = useState([] as IRule[]);

	const [currentUserNumber, setCurrentUserNumber]: [
		number,
		(currentUserNumber: number) => void
	] = useState(0);

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

	const currentUser: IUser = getUser(selectedUsers[currentUserNumber]);

	const templates = map<string, ITemplate>(item => getTemplate(item), selectedTemplates);

	const handleSetTasks = (tasksArr: ITask[]): void => setTasks(tasksToObject(tasksArr));

	const handleApply = (): void => {
		setCurrentUserNumber(currentUserNumber + 1);
	};

	const initRulesStates = async (): Promise<void> => {
		if (currentUser && templates[0] && currentUser.tasks && templates[0].tasks) {
			const currentRules: IRule[] = await tasksToRules(currentUser.tasks || []);
			const assignedRules: IRule[] = await tasksToRules(templates[0].tasks);

			if (isAdd) {
				await setCurrentRulesState(
					map<IRule, IRule>((currentRuleValue: IRule) => {
						const rule: IRule = clone(currentRuleValue);
						const task: ITask = tasks[currentRuleValue.task];

						if (task) {
							const operation: IOperation = filter((operationValue: IOperation) => {
								return compareOperationRuleStrict(operationValue, currentRuleValue);
							}, task.operations)[0];

							if (operation) {
								rule.selected = true;
							}
						}
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

				await setAssignedRulesState(
					map<IRule, IRule>((assignedRuleValue: IRule) => {
						const rule: IRule = clone(assignedRuleValue);

						const task: ITask = tasks[assignedRuleValue.task];

						if (task) {
							const operation: IOperation = filter((operationValue: IOperation) => {
								return compareOperationRuleStrict(operationValue, assignedRuleValue);
							}, task.operations)[0];

							if (operation) {
								rule.selected = true;
							}
						}

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
				await setCurrentRulesState(
					map<IRule, IRule>(currentRuleValue => {
						let selected: boolean = false;

						const task: ITask = tasks[currentRuleValue.task];

						if (task) {
							const operation: IOperation = filter((operationValue: IOperation) => {
								return compareOperationRuleStrict(operationValue, currentRuleValue);
							}, task.operations)[0];

							if (operation) {
								selected = true;
							}
						}

						return { ...currentRuleValue, selected };
					}, currentRules),
				);

				setAssignedRulesState(
					map<IRule, IRule>(assignedRuleValue => {
						let selected: boolean = false;

						const task: ITask = tasks[assignedRuleValue.task];

						if (task) {
							const operation: IOperation = filter((operationValue: IOperation) => {
								return compareOperationRuleStrict(operationValue, assignedRuleValue);
							}, task.operations)[0];

							if (operation) {
								selected = true;
							}
						}

						return { ...assignedRuleValue, selected };
					}, assignedRules),
				);
			}
		}
	};

	const updateRulesState = () => {
		if (isAdd) {
			setCurrentRulesState(
				map<IRule, IRule>(currentRuleValue => {
					let selected: boolean = false;

					const task: ITask = tasks[currentRuleValue.task];

					if (task) {
						const operation: IOperation = filter((operationValue: IOperation) => {
							return compareOperationRuleStrict(operationValue, currentRuleValue);
						}, task.operations)[0];

						if (operation) {
							selected = true;
						}
					}

					return { ...currentRuleValue, selected };
				}, currentRulesState),
			);

			setAssignedRulesState(
				map<IRule, IRule>(assignedRuleValue => {
					let selected: boolean = false;

					const task: ITask = tasks[assignedRuleValue.task];

					if (task) {
						const operation: IOperation = filter((operationValue: IOperation) => {
							return compareOperationRuleStrict(operationValue, assignedRuleValue);
						}, task.operations)[0];

						if (operation) {
							selected = true;
						}
					}

					return { ...assignedRuleValue, selected };
				}, assignedRulesState),
			);
		} else {
			setCurrentRulesState(
				map<IRule, IRule>(currentRuleValue => {
					let selected: boolean = false;

					const task: ITask = tasks[currentRuleValue.task];

					if (task) {
						const operation: IOperation = filter((operationValue: IOperation) => {
							return compareOperationRuleStrict(operationValue, currentRuleValue);
						}, task.operations)[0];

						if (operation) {
							selected = true;
						}
					}

					return { ...currentRuleValue, selected };
				}, currentRulesState),
			);

			setAssignedRulesState(
				map<IRule, IRule>(assignedRuleValue => {
					let selected: boolean = false;

					const task: ITask = tasks[assignedRuleValue.task];

					if (task) {
						const operation: IOperation = filter((operationValue: IOperation) => {
							return compareOperationRuleStrict(operationValue, assignedRuleValue);
						}, task.operations)[0];

						if (operation) {
							selected = true;
						}
					}

					return { ...assignedRuleValue, selected };
				}, assignedRulesState),
			);
		}
	};

	const initTasks = async () => {
		if (isAdd) {
			if (templates[0] && templates[0].tasks && currentUser && currentUser.tasks) {
				if (currentUser.tasks.length >= templates[0].tasks.length) {
					const resultTasks: ITask[] = map<ITask, ITask>(currentTaskValue => {
						const assignedTask: ITask = filter<ITask>(assignedTaskValue => {
							return assignedTaskValue.id === currentTaskValue.id;
						}, templates[0].tasks)[0];

						if (currentTaskValue.operations.length > assignedTask.operations.length) {
							const operations: IOperation[] = reduce<IOperation, IOperation[]>(
								(accOperations, currentOperationValue) => {
									const assignedOperation: IOperation = filter<IOperation>(
										assignedOperationValue =>
											currentOperationValue.id === assignedOperationValue.id &&
											currentOperationValue.state === assignedOperationValue.state,
										assignedTask.operations,
									)[0];

									if (assignedOperation) {
										const attributes: IAttribute[] = [
											...currentOperationValue.attributes,
											...assignedOperation.attributes,
										];

										return [...accOperations, { ...assignedOperation, attributes }];
									}

									return [...accOperations, currentOperationValue];
								},
								[],
								currentTaskValue.operations,
							);

							return { ...currentTaskValue, operations };
						} else {
							const operations: IOperation[] = reduce<IOperation, IOperation[]>(
								(accOperations, assignedOperationValue) => {
									const currentOperation: IOperation = filter<IOperation>(
										currentOperationValue => assignedOperationValue.id === currentOperationValue.id,
										currentTaskValue.operations,
									)[0];

									if (currentOperation) {
										const hasConflict: boolean =
											currentOperation.state !== assignedOperationValue.state;

										if (hasConflict) {
											return accOperations;
										}

										const attributes: IAttribute[] = [
											...assignedOperationValue.attributes,
											...currentOperation.attributes,
										];

										return [...accOperations, { ...currentOperation, attributes }];
									} else {
										return [...accOperations, assignedOperationValue];
									}
								},
								[],
								assignedTask.operations,
							);

							return { ...assignedTask, operations };
						}
					}, currentUser.tasks);

					handleSetTasks(resultTasks);
				} else {
					const resultTasks: ITask[] = map<ITask, ITask>(assignedTaskValue => {
						const currentTask: ITask = filter<ITask>(currentTaskValue => {
							return currentTaskValue.id === assignedTaskValue.id;
						}, currentUser.tasks || [])[0];

						const operations: IOperation[] = reduce<IOperation, IOperation[]>(
							(accOperations, assignedOperationValue) => {
								const currentOperation: IOperation = filter<IOperation>(
									currentTaskValue =>
										assignedOperationValue.id === currentTaskValue.id &&
										assignedOperationValue.state === currentTaskValue.state,
									currentTask.operations,
								)[0];

								if (currentOperation) {
									const attributes: IAttribute[] = [
										...assignedOperationValue.attributes,
										...currentOperation.attributes,
									];

									return [...accOperations, { ...currentOperation, attributes }];
								}

								return accOperations;
							},
							[],
							assignedTaskValue.operations,
						);

						return { ...assignedTaskValue, operations };
					}, templates[0].tasks);

					handleSetTasks(resultTasks);
				}
			}
		}

		if (isOverwrite) {
			if (templates[0] && templates[0].tasks) {
				handleSetTasks(templates[0].tasks);
			}
		}

		if (isOverwritePartially) {
			if (templates[0] && templates[0].tasks && currentUser && currentUser.tasks) {
				const resultTasks: ITask[] = map<ITask, ITask>(currentTaskValue => {
					const assignedTask: ITask = filter<ITask>(assignedTaskValue => {
						return assignedTaskValue.id === currentTaskValue.id;
					}, templates[0].tasks)[0];

					const operations: IOperation[] = map<IOperation, IOperation>(currentOperationValue => {
						const assignedOperation: IOperation = filter<IOperation>(
							assignedOperationValue => currentOperationValue.id === assignedOperationValue.id,
							assignedTask.operations,
						)[0];

						if (assignedOperation) {
							return assignedOperation;
						}

						return currentOperationValue;
					}, currentTaskValue.operations);

					return { ...currentTaskValue, operations };
				}, currentUser.tasks);

				setTasks(tasksToObject(resultTasks));
			}
		}
	};

	useEffect(() => {
		initTasks();
	}, [currentUserNumber, selectedTemplates]);

	useEffect(() => {
		initRulesStates();
	}, [selectedUsers, selectedTemplates, tasks]);

	useEffect(() => {
		updateRulesState();
	}, [tasks]);

	const handleClose = (): void => history.goBack();

	const handleRemoveCurrent = (rule: IRule) => (): void => {
		if (isAdd) {
			setTasks(onRemoveOperation(tasks)(rule));
		} else {
			setTasks(onRemoveOperationOverwrite(tasks)(rule));
		}
	};

	const handleRemoveAssigned = (rule: IRule) => (): void => {
		if (isAdd) {
			setTasks(onRemoveOperation(tasks)(rule));
		} else {
			setTasks(onRemoveOperationOverwrite(tasks)(rule));
		}
	};

	const handleAddCurrent = (rule: IRule) => (): void => {
		if (isAdd) {
			setTasks(onSelectOperation(tasks)(currentUser.tasks || [], rule));
		} else {
			setTasks(onSelectOperationOverwrite(tasks)(currentUser.tasks || [], rule));
		}
	};

	const handleAddAssigned = (rule: IRule) => (): void => {
		if (isAdd) {
			setTasks(onSelectOperation(tasks)(templates[0].tasks, rule));
		} else {
			setTasks(onSelectOperationOverwrite(tasks)(templates[0].tasks, rule));
		}
	};

	const handleClear = (): void => {
		initTasks();
	};

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
			<Grid
				item={true}
				container={true}
				direction="column"
				wrap="nowrap"
				className={classes.rulesContainerWrapper}
			>
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
					<RestrictionsTable editable={false} tasks={tasks} setValue={setTasks} />
				</Grid>
			</Grid>
			<Grid
				item={true}
				container={true}
				direction="column"
				wrap="nowrap"
				className={classes.rulesContainerWrapper}
			>
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
					onClick={handleClear}
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
