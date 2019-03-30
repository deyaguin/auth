import React, { FC, ReactNode } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { Plugin, Getter, Getters, Template, TemplateConnector } from '@devexpress/dx-react-core';
import { Table } from '@devexpress/dx-react-grid';
import { TableHeaderRow, TableFilterRow } from '@devexpress/dx-react-grid-material-ui';

import { TABLE_ACTIONS_WIDTH } from '../../constants/ui';

interface ITableActionsProps {
	actions: (id: string) => ReactNode;
	headerActions?: () => ReactNode;
	filterActions?: () => ReactNode;
	width?: number;
}

const TableActions: FC<ITableActionsProps> = ({
	headerActions = () => null,
	filterActions = () => null,
	actions,
	width = TABLE_ACTIONS_WIDTH,
}) => {
	const getterComputed: any = ({ tableColumns }: Getters): any => [
		...tableColumns,
		{ key: 'actions', type: 'actions', width },
	];

	const tableBodyPredicate = ({ tableColumn, tableRow }: Getters): boolean =>
		tableColumn.type === 'actions' && tableRow.type === Table.ROW_TYPE;

	const tableFilterPredicate = ({ tableColumn, tableRow }: Getters): boolean =>
		tableColumn.type === 'actions' && tableRow.type === TableFilterRow.ROW_TYPE;

	const tableHeaderPredicate = ({ tableColumn, tableRow }: Getters): boolean =>
		tableColumn.type === 'actions' && tableRow.type === TableHeaderRow.ROW_TYPE;

	return (
		<Plugin>
			<Getter name="tableColumns" computed={getterComputed} />
			<Template name="tableCell" predicate={tableBodyPredicate}>
				{(params: Getters) => (
					<TemplateConnector>
						{(): ReactNode => <TableCell>{actions(params.tableRow.row.id)}</TableCell>}
					</TemplateConnector>
				)}
			</Template>
			<Template name="tableCell" predicate={tableFilterPredicate}>
				{(): ReactNode => (
					<TemplateConnector>{() => <TableCell>{filterActions()}</TableCell>}</TemplateConnector>
				)}
			</Template>
			<Template name="tableCell" predicate={tableHeaderPredicate}>
				{(): ReactNode => (
					<TemplateConnector>{() => <TableCell>{headerActions()}</TableCell>}</TemplateConnector>
				)}
			</Template>
		</Plugin>
	);
};

export default TableActions;
