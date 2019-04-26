// remove selected!!!

import React, { FC, ChangeEvent, ReactElement, useState, useMemo } from 'react';
import classNames from 'classnames';
import { compose, map, reduce, keys, values } from 'ramda';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { TreeDataState, CustomTreeData } from '@devexpress/dx-react-grid';
import {
	Grid,
	VirtualTable,
	TableHeaderRow,
	TableTreeColumn,
	Table,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import { TABLE_MESSAGES, OPERATION_STATES, CONDITIONS } from '../../constants/ui';
import { ITask, ITasks, IOperation, IAttribute, IValues } from '../../types';
import GridRootComponent from '../GridRootContainer';
import ValuePicker from '../ValuePicker';

const { Cell } = Table;

const styles = createStyles({
	allowed: {
		backgroundColor: green[100],
	},
	conditionPicker: {},
	container: {
		display: 'flex',
		flexGrow: 1,
		height: '100%',
		width: '100%',
	},
	denied: {
		backgroundColor: red[100],
	},
	statePicker: {},
});

interface IRestrictionsTableProps extends WithStyles<typeof styles> {
	tasks?: { [id: string]: ITask };
	setValue?: (tasksValues: IValues) => void;
	editable?: boolean;
}

const COLUMNS = [
	{ name: 'name', title: 'Задача' },
	{ name: 'state', title: 'Состояние' },
	{ name: 'attr', title: 'Атрибут' },
	{ name: 'condition', title: 'Условие' },
	{ name: 'values', title: 'Значение' },
];

const RestrictionsTable: FC<IRestrictionsTableProps> = ({
	classes,
	tasks = {},
	setValue,
	editable = true,
}) => {
	const defaultExpandedIds: number[] = compose(
		reduce<string, number[]>((acc: number[], key: string): number[] => {
			const tasksResult: number[] = [...acc, acc.length];

			return [
				...tasksResult,
				...reduce<IOperation, number[]>(
					(operationsAcc: number[], operation: IOperation): number[] => {
						const operationsResult: number[] = [
							...operationsAcc,
							tasksResult.length + operationsAcc.length,
						];

						let x = -1;

						return [
							...operationsResult,
							...map(() => {
								x += 1;

								return operationsResult.length + tasksResult.length + x;
							}, operation.attributes),
						];
					},
					[],
					tasks[key].operations,
				),
			];
		}, []),
		keys,
	)(tasks);

	const [changedValueField, setChangedValueField]: [
		string,
		(changedValueField: string) => void
	] = useState('');

	const handleSetState = (operationId: string, taskId: string) => (value: string): void => {
		const task: ITask = tasks[taskId];

		if (setValue) {
			setValue({
				...tasks,
				[taskId]: {
					...task,
					operations: map(
						(item: IOperation) => (item.id === operationId ? { ...item, state: value } : item),
						task.operations,
					),
				},
			});
		}
	};

	const handleSetCondition = (key: string, operationId: string, taskId: string) => (
		value: string,
	): void => {
		const task: ITask = tasks[taskId];

		if (setValue) {
			setValue({
				...tasks,
				[taskId]: {
					...task,
					operations: map(
						(operation: IOperation) =>
							operation.id === operationId
								? {
										...operation,
										attributes: map(
											(attribute: IAttribute) =>
												attribute.key === key ? { ...attribute, condition: value } : attribute,
											operation.attributes,
										),
								  }
								: operation,
						task.operations,
					),
				},
			});
		}
	};

	const handleSetValue = (key: string, operationId: string, taskId: string) => (
		e: ChangeEvent<HTMLInputElement>,
	): void => {
		const targetValues: string = e.currentTarget.value;
		const task: ITask = tasks[taskId];

		if (setValue) {
			setValue({
				...tasks,
				[taskId]: {
					...task,
					operations: map(
						(operation: IOperation) =>
							operation.id === operationId
								? {
										...operation,
										attributes: map(
											(attribute: IAttribute) =>
												attribute.key === key ? { ...attribute, values: targetValues } : attribute,
											operation.attributes,
										),
								  }
								: operation,
						task.operations,
					),
				},
			});
		}

		setChangedValueField(`${key}-${operationId}-${taskId}`);
	};

	const mapTasks = ({ operations, ...restTask }: ITask): ITask => ({
		...restTask,
		operations: reduce<IOperation, IOperation[]>(
			(acc: IOperation[], { attributes, state, selected, ...restOperation }: IOperation) =>
				selected
					? [
							...acc,
							{
								...restOperation,
								attributes: map(
									(item: IAttribute) => ({
										...item,
										attr: `${item.key} (${item.title})`,
										condition: item.condition || 'equal',
										operationId: restOperation.id,
										taskId: restTask.id,
										values: item.values || '',
									}),
									attributes,
								),
								state: state || 'allowed',
							},
					  ]
					: acc,
			[],
			operations,
		),
	});

	const getChildRows = (row: any, rootRows: ITask[]): any[] => {
		if (row) {
			return row.attributes ? row.attributes : row.operations;
		}

		return rootRows;
	};

	const renderCellComponent = (props: any): ReactElement => {
		if (props.column.name === 'state' && props.value) {
			if (editable) {
				return (
					<Cell {...props}>
						<ValuePicker
							className={classes.statePicker}
							value={props.value}
							onChange={handleSetState(props.row.id, props.row.taskId)}
							optionValues={OPERATION_STATES}
						/>
					</Cell>
				);
			}

			return (
				<Cell {...props}>
					<Chip
						className={classNames({
							[classes.allowed]: props.value === 'allowed',
							[classes.denied]: props.value === 'denied',
						})}
						label={OPERATION_STATES[props.value]}
					/>
				</Cell>
			);
		}

		if (props.column.name === 'condition' && props.value) {
			if (editable) {
				return (
					<Cell {...props}>
						<ValuePicker
							className={classes.conditionPicker}
							value={props.value}
							onChange={handleSetCondition(props.row.key, props.row.operationId, props.row.taskId)}
							optionValues={CONDITIONS}
						/>
					</Cell>
				);
			}

			return (
				<Cell {...props}>
					<Chip label={CONDITIONS[props.value]} />
				</Cell>
			);
		}

		if (props.column.name === 'values' && props.value !== undefined) {
			if (editable) {
				const key: string = `${props.row.key}-${props.row.operationId}-${props.row.taskId}`;

				return (
					<Cell {...props}>
						<TextField
							autoFocus={changedValueField === key}
							fullWidth={true}
							placeholder="Введите значение"
							value={props.value}
							onChange={handleSetValue(props.row.key, props.row.operationId, props.row.taskId)}
						/>
					</Cell>
				);
			}

			return <Cell {...props} />;
		}

		return <Cell {...props} />;
	};

	const tasksToArray: (tasks: ITasks) => ITask[] = compose(
		map<ITask, ITask>(mapTasks),
		values,
	);

	return useMemo(
		() => (
			<Paper className={classes.container}>
				{defaultExpandedIds.length > 0 && (
					<Grid rootComponent={GridRootComponent} rows={tasksToArray(tasks)} columns={COLUMNS}>
						<TreeDataState defaultExpandedRowIds={defaultExpandedIds} />
						<CustomTreeData getChildRows={getChildRows} />
						<VirtualTable messages={TABLE_MESSAGES} cellComponent={renderCellComponent} />
						<TableHeaderRow />
						<TableTreeColumn for="name" />
					</Grid>
				)}
			</Paper>
		),
		[tasks],
	);
};

export default withStyles(styles)(RestrictionsTable);
