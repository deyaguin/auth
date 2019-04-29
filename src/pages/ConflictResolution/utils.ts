import { reduce, map, forEach } from 'ramda';

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
