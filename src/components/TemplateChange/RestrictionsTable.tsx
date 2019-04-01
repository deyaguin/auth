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
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';

import { TABLE_MESSAGES, OPERATION_STATES } from '../../constants/ui';
import GridRootComponent from '../GridRootContainer';
import { ITask, IOperation, IAttribute, IErrors, SetValue } from './types';

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

const RestrictionsTable: FC<IRestrictionsTableProps> = ({ classes, tasks = [] }) => {
	const tasksMap = ({ operations, ...restTask }: ITask): ITask => ({
		...restTask,
		operations: operations.map(({ attributes, state, ...restOperation }: IOperation) => ({
			...restOperation,
			attributes: attributes.map((item: IAttribute) => ({
				...item,
				attr: `${item.key} (${item.title})`,
			})),
			state: state || OPERATION_STATES.not_set,
		})),
	});

	const getChildRows = (row: any, rootRows: ITask[]): any[] => {
		if (row) {
			return row.operations ? row.operations : row.attributes;
		}

		return rootRows;
	};

	return (
		<Paper className={classes.container}>
			<Grid rootComponent={GridRootComponent} rows={tasks.map(tasksMap)} columns={COLUMNS}>
				<TreeDataState />
				<CustomTreeData getChildRows={getChildRows} />
				<VirtualTable messages={TABLE_MESSAGES} />
				<TableHeaderRow />
				<TableTreeColumn for="name" />
			</Grid>
		</Paper>
	);
};

export default withStyles(styles)(RestrictionsTable);
