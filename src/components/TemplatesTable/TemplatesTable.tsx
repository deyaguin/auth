import React, { FC, Fragment } from 'react';
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

import { TABLE_PAGE_SIZES, FILTER_MESSAGES, TABLE_MESSAGES } from '../../constants/ui';
import { TEMPLATES } from '../../constants/routes';
import Popover from '../Popover';

const { Cell: TableFilterCell } = TableFilterRow;

const styles = createStyles({
	link: {
		textDecoration: 'none',
	},
	table: {
		flex: 1,
	},
});

interface ITemplate {
	id: string;
	name: string;
	comment: string;
}

interface ITemplatesTableProps extends WithStyles<typeof styles> {
	templates: ITemplate[];
	templateDelete: (id: string) => void;
	pageSize: number;
	currentPage: number;
	total: number;
	onPageSizeChange: (pageSize: number) => void;
	onCurrentPageChange: (currentPage: number) => void;
}

const COLUMNS = [
	{ name: 'name', title: 'Шаблон' },
	{ name: 'comment', title: 'Комментарий' },
	{ name: 'actions', title: ' ' },
];

const TemplatesTable: FC<ITemplatesTableProps> = ({
	classes,
	templates,
	pageSize,
	currentPage,
	onPageSizeChange,
	onCurrentPageChange,
	total,
	templateDelete,
}) => {
	const handleTemplateDelete = (id: string) => () => templateDelete(id);

	const renderActions = (id: string) => (
		<Fragment key={id}>
			<Link to={`${TEMPLATES}/${id}`}>
				<IconButton color="primary">
					<OpenInNewIcon />
				</IconButton>
			</Link>
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
		</Fragment>
	);

	const renderFilterCell = (props: any) => {
		if (props.column.name === 'actions') {
			const { children, ...rest } = props;

			return <TableFilterCell {...rest} />;
		}

		return <TableFilterCell {...props} />;
	};

	return (
		<Grid
			rows={templates.map(item => ({
				...item,
				actions: renderActions(item.id),
			}))}
			columns={COLUMNS}
		>
			<PagingState
				pageSize={pageSize}
				defaultCurrentPage={0}
				currentPage={currentPage}
				onCurrentPageChange={onCurrentPageChange}
				onPageSizeChange={onPageSizeChange}
			/>
			<FilteringState />
			<IntegratedFiltering />
			<CustomPaging totalCount={total} />
			<VirtualTable
				messages={TABLE_MESSAGES}
				columnExtensions={[{ columnName: 'actions', align: 'right' }]}
			/>
			<TableHeaderRow />
			<TableFilterRow messages={FILTER_MESSAGES} cellComponent={renderFilterCell} />
			<PagingPanel pageSizes={TABLE_PAGE_SIZES} />
		</Grid>
	);
};

export default withStyles(styles)(TemplatesTable);
