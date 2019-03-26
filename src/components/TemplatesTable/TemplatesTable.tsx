import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { PagingState, CustomPaging } from '@devexpress/dx-react-grid';
import {
	Grid,
	VirtualTable,
	TableHeaderRow,
	PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { TABLE_PAGE_SIZES } from '../../constants/ui';
import { TEMPLATES } from '../../constants/routes';
import Popper from '../Popper';

const styles = createStyles({
	actions: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
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
	limit: number;
	offset: number;
	total: number;
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
}

const columns = [
	{ name: 'name', title: 'Шаблон' },
	{ name: 'comment', title: 'Комментарий' },
	{ name: 'actions', title: ' ' },
];

const TemplatesTable: FC<ITemplatesTableProps> = ({
	classes,
	templates,
	limit,
	offset,
	setOffset,
	setLimit,
	total,
	templateDelete,
}) => {
	const handlePageSizeChange = (pageSize: number) => {
		setLimit(pageSize);
	};

	const handleCurrentPageChange = (currentPage: number) => {
		setOffset(currentPage * limit);
	};

	const handleTemplateDelete = (id: string) => () => templateDelete(id);

	return (
		<Grid
			rows={templates.map(item => ({
				...item,
				actions: (
					<div className={classes.actions} key={item.id}>
						<Link to={`${TEMPLATES}/${item.id}`}>
							<IconButton color="primary">
								<OpenInNewIcon />
							</IconButton>
						</Link>
						<Popper
							onAgree={handleTemplateDelete(item.id)}
							title="Удалить шаблон?"
							agreeText="Удалить"
							cancelText="Отмена"
						>
							{onClick => (
								<IconButton onClick={onClick} color="secondary">
									<DeleteIcon />
								</IconButton>
							)}
						</Popper>
					</div>
				),
			}))}
			columns={columns}
		>
			<PagingState
				pageSize={limit}
				defaultCurrentPage={0}
				currentPage={offset / limit}
				onCurrentPageChange={handleCurrentPageChange}
				onPageSizeChange={handlePageSizeChange}
			/>
			<CustomPaging totalCount={total} />
			<VirtualTable />
			<TableHeaderRow />
			<PagingPanel pageSizes={TABLE_PAGE_SIZES} />
		</Grid>
	);
};

export default withStyles(styles)(TemplatesTable);
