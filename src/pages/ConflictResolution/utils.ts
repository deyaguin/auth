import { reduce, map, forEach, findIndex, propEq, remove, clone, filter, find } from 'ramda';

import { OPERATION_STATES } from '../../constants/ui';
import { IRule, ITask, IOperation, IAttribute, IRuleAttribute, ITasks } from '../../types';

export const tasksToRules = reduce<ITask, IRule[]>(
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

export const tasksToObject = reduce(
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

export const compareOperationRuleStrict = (operation: IOperation, rule: IRule): boolean => {
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

export const onRemoveOperationOverwrite = (tasks: ITasks) => (rule: IRule): ITasks => {
	const task: ITask = tasks[rule.task];
	const operations: IOperation[] = task.operations;

	const index: number = findIndex(propEq('id', rule.operation))(task.operations);

	if (index !== -1) {
		return {
			...tasks,
			[task.id]: {
				...task,
				operations: remove(index, 1, operations),
			},
		};
	}

	return tasks;
};

export const onSelectOperationOverwrite = (tasks: ITasks) => (
	tasksArr: ITask[],
	rule: IRule,
): ITasks => {
	const task: ITask = tasks[rule.task];
	const operations: IOperation[] = task.operations;
	const operation: IOperation = filter<IOperation>(
		operationValue => operationValue.id === rule.operation,
		filter<ITask>(taskValue => taskValue.id === rule.task, tasksArr)[0].operations,
	)[0];

	const result: ITasks = clone(tasks);

	const index: number = findIndex(propEq('id', operation.id))(task.operations);

	if (index !== -1) {
		result[task.id] = {
			...task,
			operations: [...remove(index, 1, operations), { ...operation, selected: true }],
		};
	} else {
		result[task.id] = {
			...task,
			operations: [...operations, { ...operation, selected: true }],
		};
	}

	return result;
};

export const onSelectOperation = (tasks: ITasks) => (tasksValue: ITask[], rule: IRule): ITasks => {
	const task: ITask = tasks[rule.task];
	const operations: IOperation[] = clone(task.operations);
	const operation: IOperation = filter<IOperation>(
		operationValue => operationValue.id === rule.operation,
		filter<ITask>(taskValue => taskValue.id === rule.task, tasksValue)[0].operations,
	)[0];

	const result: ITasks = clone(tasks);

	const index = findIndex(propEq('id', operation.id))(operations);

	if (index !== -1) {
		if (operations[index].state !== operation.state) {
			result[task.id] = {
				...task,
				operations: [...remove(index, 1, operations), { ...operation, selected: true }],
			};
		} else {
			operations[index].attributes = [...operations[index].attributes, ...operation.attributes];

			result[task.id] = {
				...task,
				operations,
			};
		}
	} else {
		result[task.id] = {
			...task,
			operations: [...operations, { ...operation, selected: true }],
		};
	}

	return result;
};

export const onRemoveOperation = (tasks: ITasks) => (rule: IRule): ITasks => {
	const task: ITask = tasks[rule.task];
	const operations: IOperation[] = task.operations;

	const index: number = findIndex(propEq('id', rule.operation))(task.operations);
	const operation: IOperation = find(propEq('id', rule.operation))(task.operations);

	if (index !== -1) {
		if (operation.attributes.length > rule.attributes.length) {
			const removedOperation: IOperation = operations[index];
			removedOperation.attributes = reduce<IAttribute, IAttribute[]>(
				(accAttributes, attributeValue) => {
					const hasAttribute: boolean =
						findIndex(propEq('values', attributeValue.values))(rule.attributes) !== -1;

					if (hasAttribute) {
						return accAttributes;
					}

					return [...accAttributes, attributeValue];
				},
				[],
				removedOperation.attributes,
			);

			return {
				...tasks,
				[task.id]: {
					...task,
					operations,
				},
			};
		} else {
			const remainingOperations: IOperation[] = remove(index, 1, operations);

			return {
				...tasks,
				[task.id]: {
					...task,
					operations: remainingOperations,
				},
			};
		}
	}

	return tasks;
};
