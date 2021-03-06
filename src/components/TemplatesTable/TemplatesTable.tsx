// todo multiple selection

import React, { FC, ReactNode } from 'react';
import { without } from 'ramda';
import { Link } from 'react-router-dom';
import { PagingState, CustomPaging, SelectionState } from '@devexpress/dx-react-grid';
import {
	Grid,
	VirtualTable,
	TableHeaderRow,
	PagingPanel,
	TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import EditIcon from '@material-ui/icons/Edit';

import { ITemplate, SelectedItem } from '../../types';
import { TABLE_PAGE_SIZES, TABLE_MESSAGES, TABLE_PAGINATION_MESSAGES } from '../../constants/ui';
import { TEMPLATES } from '../../constants/routes';
import Popover from '../Popover';
import TableActions from '../TableActions';
import GridRootContainer from '../GridRootContainer';

const styles = createStyles({
	actions: {
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'flex-end',
	},
	link: {
		textDecoration: 'none',
	},
	table: {
		flexGrow: 1,
	},
});

interface ITemplatesTableProps extends WithStyles<typeof styles> {
	templates: ITemplate[];
	pageSize: number;
	currentPage: number;
	total: number;
	removable?: boolean;
	editable?: boolean;
	selectable?: boolean;
	selectedItems?: SelectedItem[];
	onSelectItems?: (items: SelectedItem[]) => void;
	templateDelete?: (id: string) => void;
	onPageSizeChange: (pageSize: number) => void;
	onCurrentPageChange: (currentPage: number) => void;
}

const COLUMNS = [{ name: 'name', title: 'Шаблон' }, { name: 'comment', title: 'Комментарий' }];

const TemplatesTable: FC<ITemplatesTableProps> = ({
	classes,
	templates,
	pageSize,
	total,
	currentPage,
	onPageSizeChange,
	onCurrentPageChange,
	templateDelete,
	removable = false,
	editable = false,
	selectable = false,
	selectedItems,
	onSelectItems,
}) => {
	const handleTemplateDelete = (id: string) => (): void => templateDelete && templateDelete(id);

	const handleCurrentPageChange = (pageNumber: number): void => onCurrentPageChange(pageNumber);

	const renderActions = (id: string): ReactNode => (
		<div className={classes.actions} key={id}>
			<Link to={`${TEMPLATES}/${id}`}>
				<Tooltip title="Открыть шаблон">
					<IconButton color="primary">
						<OpenInNewIcon />
					</IconButton>
				</Tooltip>
			</Link>
			{editable && (
				<Link to={`${TEMPLATES}/edit/${id}`}>
					<Tooltip title="Редактировать шаблон">
						<IconButton color="primary">
							<EditIcon />
						</IconButton>
					</Tooltip>
				</Link>
			)}
			{removable && (
				<Popover
					onAgree={handleTemplateDelete(id)}
					title="Удалить шаблон?"
					agreeText="Удалить"
					cancelText="Отмена"
				>
					{(setButtonRef: (node: any) => void, onClick) => (
						<Tooltip title="Удалить шаблон">
							<IconButton color="secondary" buttonRef={setButtonRef} onClick={onClick}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					)}
				</Popover>
			)}
		</div>
	);

	return (
		<Grid rootComponent={GridRootContainer} rows={templates} columns={COLUMNS}>
			<PagingState
				pageSize={pageSize}
				defaultCurrentPage={0}
				currentPage={currentPage}
				onCurrentPageChange={handleCurrentPageChange}
				onPageSizeChange={onPageSizeChange}
			/>
			{selectable && <SelectionState selection={selectedItems} onSelectionChange={onSelectItems} />}
			<CustomPaging totalCount={total} />
			<VirtualTable
				messages={TABLE_MESSAGES}
				columnExtensions={[{ columnName: 'actions', align: 'right' }]}
			/>
			{selectable && <TableSelection />}
			<TableActions actions={renderActions} />
			<TableHeaderRow />
			<PagingPanel pageSizes={TABLE_PAGE_SIZES} messages={TABLE_PAGINATION_MESSAGES} />
		</Grid>
	);
};

export default withStyles(styles)(TemplatesTable);
