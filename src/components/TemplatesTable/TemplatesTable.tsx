import React, { FC, ReactNode, ReactElement, ChangeEvent, useState } from 'react';
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
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';

import { TABLE_PAGE_SIZES, FILTER_MESSAGES, TABLE_MESSAGES } from '../../constants/ui';
import { TEMPLATES } from '../../constants/routes';
import Popover from '../Popover';
import TableActions from '../TableActions';
import GridRootContainer from '../GridRootContainer';

const { Cell: TableFilterCell } = TableFilterRow;

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
	const [filterIsVisible, setFilterIsVisible]: [
		boolean,
		(filterIsVisible: boolean) => void
	] = useState(false);

	const [filtersState, setFiltersState]: [
		{ [propName: string]: boolean | string | number },
		(filterState: { [propName: string]: boolean | string | number }) => void
	] = useState(filters);

	const [changedValueField, setChangedValueField]: [
		string,
		(changedValueField: string) => void
	] = useState('');

	const filtersCount: number = Object.keys(filters).length;

	const getFilters = (): Array<{ columnName: string; value: any }> => {
		return Object.keys(filters).map((key: string) => ({ columnName: key, value: filters[key] }));
	};

	const handleClickFilterButton = (): void => setFilterIsVisible(!filterIsVisible);

	const handleSetFiltersState = (filter: string) => (e: ChangeEvent<HTMLInputElement>): void => {
		setFiltersState({ ...filtersState, [filter]: e.currentTarget.value });

		setChangedValueField(filter);
	};

	const handleSetFilters = (): void => {
		setFilters(filtersState);
	};

	const handleCloseFilter = (): void => {
		clearFilters();

		setFiltersState({});

		setChangedValueField('');

		setFilterIsVisible(false);
	};

	const handleTemplateDelete = (id: string) => (): void => templateDelete(id);

	const renderActions = (id: string): ReactNode => (
		<div className={classes.actions} key={id}>
			<Link to={`${TEMPLATES}/${id}`}>
				<Tooltip title="Открыть шаблон">
					<IconButton color="primary">
						<OpenInNewIcon />
					</IconButton>
				</Tooltip>
			</Link>
			<Link to={`${TEMPLATES}/edit/${id}`}>
				<Tooltip title="Редактировать шаблон">
					<IconButton color="primary">
						<EditIcon />
					</IconButton>
				</Tooltip>
			</Link>
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
		</div>
	);

	const renderHeaderActions = (): ReactNode => (
		<div className={classes.actions}>
			{filterIsVisible ? (
				<Tooltip title="Применить">
					<IconButton color="primary" onClick={handleSetFilters}>
						<CheckIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Фильтрация">
					<IconButton color="primary" onClick={handleClickFilterButton}>
						<Badge badgeContent={filtersCount} color="primary">
							<FilterListIcon />
						</Badge>
					</IconButton>
				</Tooltip>
			)}
		</div>
	);

	const renderFilterActions = (): ReactNode => (
		<div className={classes.actions}>
			<Tooltip title="Очистить фильтры">
				<IconButton color="secondary" onClick={handleCloseFilter}>
					<ClearIcon />
				</IconButton>
			</Tooltip>
		</div>
	);

	const renderFilterCell = (props: any): ReactElement => (
		<TableFilterCell {...props}>
			<TextField
				placeholder={props.getMessage('filterPlaceholder')}
				autoFocus={props.column.name === changedValueField}
				value={filtersState[props.column.name]}
				onChange={handleSetFiltersState(props.column.name)}
			/>
		</TableFilterCell>
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
			<FilteringState filters={getFilters()} />
			<IntegratedFiltering />
			<CustomPaging totalCount={total} />
			<VirtualTable
				messages={TABLE_MESSAGES}
				columnExtensions={[{ columnName: 'actions', align: 'right' }]}
			/>
			<TableActions
				headerActions={renderHeaderActions}
				actions={renderActions}
				filterActions={renderFilterActions}
			/>
			<TableHeaderRow />
			{filterIsVisible && (
				<TableFilterRow messages={FILTER_MESSAGES} cellComponent={renderFilterCell} />
			)}
			<PagingPanel pageSizes={TABLE_PAGE_SIZES} />
		</Grid>
	);
};

export default withStyles(styles)(TemplatesTable);
