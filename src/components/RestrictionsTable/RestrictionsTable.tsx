import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {
	FilteringState,
	IntegratedFiltering,
	TreeDataState,
	CustomTreeData,
} from '@devexpress/dx-react-grid';
import {
	Grid,
	VirtualTable,
	TableHeaderRow,
	TableFilterRow,
	TableTreeColumn,
	Table,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';

import { TABLE_MESSAGES, OPERATION_STATES } from '../../constants/ui';
import { ITask, IOperation, IAttribute, IErrors, SetValue } from '../types';
import GridRootComponent from '../GridRootContainer';
import StatePicker from '../StatePicker';

const { Cell } = Table;

const styles = (theme: Theme) =>
	createStyles({
		container: {
			marginTop: theme.spacing.unit * 5,
			width: '100%',
		},
	});

interface IRestrictionsTableProps extends WithStyles<typeof styles> {
	tasks?: ITask[];
	setValue: SetValue;
	errors: IErrors;
}

const COLUMNS = [
	{ name: 'name', title: 'Задача' },
	{ name: 'state', title: 'Состояние' },
	{ name: 'attr', title: 'Атрибут' },
	{ name: 'condition', title: 'Условие' },
	{ name: 'value', title: 'Значение' },
];

const RestrictionsTable: FC<IRestrictionsTableProps> = ({
	classes,
	tasks = [],
	setValue,
	errors,
}) => {
	const handleSetState = (value: string): void => {
		console.log(value);
	};

	const handleSetCondition = (): void => {};

	const handleSetValue = (): void => {};

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
							})),
							state: state || 'not_set',
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
			return row.operations ? row.operations : row.attributes;
		}

		return rootRows;
	};

	const renderCellComponent = (props: any) => {
		if (props.column.name === 'state' && props.value) {
			return (
				<Cell {...props}>
					<StatePicker value={props.value} onChange={handleSetState} />
				</Cell>
			);
		}

		return <Cell {...props} />;
	};

	return (
		<Paper className={classes.container}>
			<Grid rootComponent={GridRootComponent} rows={tasks.map(mapTasks)} columns={COLUMNS}>
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
