import React, { FC, ChangeEvent, ReactElement, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
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

import { TABLE_MESSAGES, OPERATION_STATES, CONDITIONS } from '../../constants/ui';
import { ITask, IOperation, IAttribute, SetValue } from '../types';
import GridRootComponent from '../GridRootContainer';
import ValuePicker from '../ValuePicker';

const { Cell } = Table;

const styles = (theme: Theme) =>
	createStyles({
		conditionPicker: {
			// maxWidth: 50,
		},
		container: {
			display: 'flex',
			flexGrow: 1,
			height: '100%',
			width: '100%',
		},
		statePicker: {
			// maxWidth: 120,
		},
	});

interface IRestrictionsTableProps extends WithStyles<typeof styles> {
	tasks?: { [id: string]: ITask };
	setValue?: SetValue;
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
	const [changedValueField, setChangedValueField]: [
		string,
		(changedValueField: string) => void
	] = useState('');

	const handleSetState = (operationId: string, taskId: string) => (value: string): void => {
		const task: ITask = tasks[taskId];

		if (setValue) {
			setValue('selectedTasks', {
				...tasks,
				[taskId]: {
					...task,
					operations: task.operations.map((item: IOperation) => {
						if (item.id === operationId) {
							return { ...item, state: value };
						}

						return item;
					}),
				},
			});
		}
	};

	const handleSetCondition = (key: string, operationId: string, taskId: string) => (
		value: string,
	): void => {
		const task: ITask = tasks[taskId];

		if (setValue) {
			setValue('selectedTasks', {
				...tasks,
				[taskId]: {
					...task,
					operations: task.operations.map((operation: IOperation) => {
						if (operation.id === operationId) {
							return {
								...operation,
								attributes: operation.attributes.map((attribute: IAttribute) => {
									if (attribute.key === key) {
										return { ...attribute, condition: value };
									}

									return attribute;
								}),
							};
						}

						return operation;
					}),
				},
			});
		}
	};

	const handleSetValue = (key: string, operationId: string, taskId: string) => (
		e: ChangeEvent<HTMLInputElement>,
	): void => {
		const values: string = e.currentTarget.value;
		const task: ITask = tasks[taskId];

		if (setValue) {
			setValue('selectedTasks', {
				...tasks,
				[taskId]: {
					...task,
					operations: task.operations.map((operation: IOperation) => {
						if (operation.id === operationId) {
							return {
								...operation,
								attributes: operation.attributes.map((attribute: IAttribute) => {
									if (attribute.key === key) {
										return { ...attribute, values };
									}

									return attribute;
								}),
							};
						}

						return operation;
					}),
				},
			});
		}

		setChangedValueField(`${key}-${operationId}-${taskId}`);
	};

	const mapTasks = ({ operations, ...restTask }: ITask): ITask => ({
		...restTask,
		operations: operations.reduce(
			(acc: IOperation[], { attributes, state, selected, ...restOperation }: IOperation) => {
				if (selected) {
					return [
						...acc,
						{
							...restOperation,
							attributes: attributes.map((item: IAttribute) => ({
								...item,
								attr: `${item.key} (${item.title})`,
								condition: item.condition || 'equal',
								operationId: restOperation.id,
								taskId: restTask.id,
								values: item.values || '',
							})),
							state: state || 'allowed',
						},
					];
				}

				return acc;
			},
			[],
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
					<Chip label={OPERATION_STATES[props.value]} />
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

	return (
		<Paper className={classes.container}>
			<Grid
				rootComponent={GridRootComponent}
				rows={Object.values(tasks).map(mapTasks)}
				columns={COLUMNS}
			>
				<TreeDataState />
				<CustomTreeData getChildRows={getChildRows} />
				<VirtualTable messages={TABLE_MESSAGES} cellComponent={renderCellComponent} />
				<TableHeaderRow />
				<TableTreeColumn for="name" />
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(RestrictionsTable);
