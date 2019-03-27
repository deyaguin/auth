import React, { FC, Fragment, useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
	PagingState,
	CustomPaging,
	FilteringState,
	IntegratedFiltering,
} from '@devexpress/dx-react-grid';
import {
	Grid,
	VirtualTable,
	TableHeaderRow,
	PagingPanel,
	TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';

import { TABLE_PAGE_SIZES, FILTER_MESSAGES, TABLE_MESSAGES } from '../../constants/ui';
import { TEMPLATES } from '../../constants/routes';
import Popover from '../Popover';
import TableActions from '../TableActions';
import GridRootContainer from '../GridRootContainer';

const styles = createStyles({
	fliterActions: {
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'flex-end',
	},
	link: {
		textDecoration: 'none',
	},
	table: {
		flex: 1,
	},
});

interface IFilters {
	[name: string]: boolean | string | number;
}

interface ITemplate {
	id: string;
	name: string;
	comment: string;
}

interface ITemplatesTableProps extends WithStyles<typeof styles> {
	templates: ITemplate[];
	pageSize: number;
	currentPage: number;
	total: number;
	filters: IFilters;
	templateDelete: (id: string) => void;
	onPageSizeChange: (pageSize: number) => void;
	onCurrentPageChange: (currentPage: number) => void;
	setFilters: (filters: IFilters) => void;
	clearFilters: () => void;
}

const COLUMNS = [{ name: 'name', title: 'Шаблон' }, { name: 'comment', title: 'Комментарий' }];

const TemplatesTable: FC<ITemplatesTableProps> = ({
	classes,
	templates,
	pageSize,
	total,
	filters,
	currentPage,
	onPageSizeChange,
	onCurrentPageChange,
	templateDelete,
	setFilters,
	clearFilters,
}) => {
	const [filterIsVisible, setFilterIsVisible] = useState(false);
	const [filterState, setFiltersState]: [
		Array<{ columnName: string; value: any }>,
		(filters: any) => void
	] = useState([]);

	const getFilters: () => Array<{ columnName: string; value: any }> = () => {
		return Object.keys(filters).map((key: string) => ({ columnName: key, value: filters[key] }));
	};

	const handleOpenFilter = () => setFilterIsVisible(true);

	const handleSetFilters = () => {};

	const handleCloseFilter = () => {
		setFilterIsVisible(false);

		clearFilters();
	};

	const handleTemplateDelete = (id: string) => () => templateDelete(id);

	const renderActions = (id: string) => (
		<div className={classes.fliterActions} key={id}>
			<Popover
				onAgree={handleTemplateDelete(id)}
				title="Удалить шаблон?"
				agreeText="Удалить"
				cancelText="Отмена"
			>
				{(setButtonRef: (node: any) => void, onClick) => (
					<IconButton buttonRef={setButtonRef} onClick={onClick} color="secondary">
						<DeleteIcon />
					</IconButton>
				)}
			</Popover>
			<Link to={`${TEMPLATES}/${id}`}>
				<IconButton color="primary">
					<OpenInNewIcon />
				</IconButton>
			</Link>
			<IconButton color="primary">
				<EditIcon />
			</IconButton>
		</div>
	);

	const renderHeaderActions = () => (
		<div className={classes.fliterActions}>
			{filterIsVisible ? (
				<Fragment>
					<IconButton color="secondary" onClick={handleCloseFilter}>
						<DeleteIcon />
					</IconButton>
					<IconButton color="primary" onClick={handleCloseFilter}>
						<CheckIcon />
					</IconButton>
				</Fragment>
			) : (
				<IconButton color="primary" onClick={handleOpenFilter}>
					<FilterListIcon />
				</IconButton>
			)}
		</div>
	);

	return (
		<Grid rootComponent={GridRootContainer} rows={templates} columns={COLUMNS}>
			<PagingState
				pageSize={pageSize}
				defaultCurrentPage={0}
				currentPage={currentPage}
				onCurrentPageChange={onCurrentPageChange}
				onPageSizeChange={onPageSizeChange}
			/>
			<FilteringState filters={filterState} onFiltersChange={setFiltersState} />
			<IntegratedFiltering />
			<CustomPaging totalCount={total} />
			<VirtualTable
				messages={TABLE_MESSAGES}
				columnExtensions={[{ columnName: 'actions', align: 'right' }]}
			/>
			<TableActions headerActions={renderHeaderActions} actions={renderActions} />
			<TableHeaderRow />
			{filterIsVisible && <TableFilterRow messages={FILTER_MESSAGES} />}
			<PagingPanel pageSizes={TABLE_PAGE_SIZES} />
		</Grid>
	);
};

export default withStyles(styles)(TemplatesTable);
