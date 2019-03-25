import React, { FunctionComponent, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import BaseTable from '@material-ui/core/Table';
import BaseTableBody from '@material-ui/core/TableBody';
import BaseTableHead from '@material-ui/core/TableHead';
import BaseTableRow from '@material-ui/core/TableRow';
import BaseTableCell from '@material-ui/core/TableCell';

const styles = createStyles({
	table: {},
});

interface ITableProps extends WithStyles<typeof styles> {
	data?: Array<{ [name: string]: any }>;
	head: Array<{ key: string; [name: string]: string | ReactNode }>;
}

const Table: FunctionComponent<ITableProps> = ({ classes, head, data }) => {
	const renderRow: (item: { [name: string]: any }) => ReactNode = (item: {
		[name: string]: any;
	}) => (
		<BaseTableRow key={item.id}>
			{head.map(({ key }) => (
				<BaseTableCell key={key}>{item[key]}</BaseTableCell>
			))}
		</BaseTableRow>
	);

	const renderHead: () => ReactNode = () => (
		<BaseTableRow>
			{head.map(item => (
				<BaseTableCell {...item} />
			))}
		</BaseTableRow>
	);

	const renderData: () => ReactNode = () => {
		const cells: ReactNode[] = Object.keys(head).map(key => data);

		return data ? data.map(item => renderRow(item)) : null;
	};

	return (
		<BaseTable className={classes.table}>
			<BaseTableHead>{renderHead()}</BaseTableHead>
			<BaseTableBody>{renderData()}</BaseTableBody>
		</BaseTable>
	);
};

export default withStyles(styles)(Table);
