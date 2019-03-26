import React, { FC, MouseEvent } from 'react';
import BaseTablePagination from '@material-ui/core/TablePagination';

import { TABLE_PER_PAGE } from '../../constants/ui';
import TablePaginationActions from './TablePaginationActions';

interface ITablePaginationProps {
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
	limit: number;
	offset: number;
	total: number;
	perPageOptions?: number[];
}

const TablePagination: FC<ITablePaginationProps> = ({
	setLimit,
	setOffset,
	limit,
	offset,
	total,
	perPageOptions,
}) => {
	const page = offset / limit;

	const handleSetLimit = (e: any) => {
		setLimit(Number(e.currentTarget.value));

		setOffset(0);
	};

	const handleSetOffset = (_: any, pageNumber: number) => {
		setOffset(limit * pageNumber);
	};

	return (
		<BaseTablePagination
			component="div"
			labelRowsPerPage="Элементов на странице"
			rowsPerPageOptions={perPageOptions || TABLE_PER_PAGE}
			colSpan={4}
			count={total}
			page={page}
			rowsPerPage={limit}
			onChangePage={handleSetOffset}
			onChangeRowsPerPage={handleSetLimit}
			ActionsComponent={TablePaginationActions}
			SelectProps={{
				native: true,
			}}
		/>
	);
};

export default TablePagination;
