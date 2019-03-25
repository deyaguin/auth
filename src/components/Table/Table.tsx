import React, { FunctionComponent } from 'react';
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
	data?: Array<{}>;
	head: Array<{}>;
}

const Table: FunctionComponent<ITableProps> = ({ classes, head, data }) => {
	const renderHead = () => (
		<BaseTableRow>
			{head.map(item => (
				<BaseTableCell {...item} />
			))}
		</BaseTableRow>
	);

	return (
		<BaseTable className={classes.table}>
			<BaseTableHead>{renderHead()}</BaseTableHead>
			<BaseTableBody>test</BaseTableBody>
		</BaseTable>
	);
};

export default withStyles(styles)(Table);
