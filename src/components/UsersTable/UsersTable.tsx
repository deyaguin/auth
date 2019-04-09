import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
	PagingState,
	CustomPaging,
	SelectionState,
	IntegratedSelection,
} from '@devexpress/dx-react-grid';
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

import { TABLE_PAGE_SIZES, TABLE_MESSAGES, TABLE_PAGINATION_MESSAGES } from '../../constants/ui';
import { USERS } from '../../constants/routes';
import { PROFILE_SCHEMA } from '../../constants';
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
		flex: 1,
	},
});

interface IUser {
	id: string;
	login: string;
}

interface IUsersTableProps extends WithStyles<typeof styles> {
	users: IUser[];
	pageSize: number;
	currentPage: number;
	total: number;
	selectedUsers: Array<string | number>;
	userDelete: (id: string) => void;
	onPageSizeChange: (pageSize: number) => void;
	onCurrentPageChange: (currentPage: number) => void;
	onSelectUsers: (selecetedUser: any) => void;
}

const COLUMNS = [{ name: 'login', title: 'Логин' }, ...PROFILE_SCHEMA];

const UsersTable: FC<IUsersTableProps> = ({
	classes,
	users,
	pageSize,
	total,
	currentPage,
	selectedUsers,
	onPageSizeChange,
	onCurrentPageChange,
	userDelete,
	onSelectUsers: onSelectUser,
}) => {
	const handleUserDelete = (id: string) => (): void => userDelete(id);

	const handleSelectUser = (selection: Array<string | number>): void => {
		onSelectUser(selection);
	};

	const renderActions = (id: string): ReactNode => (
		<div className={classes.actions} key={id}>
			<Link to={`${USERS}/${id}`}>
				<Tooltip title="Открыть пользователя">
					<IconButton color="primary">
						<OpenInNewIcon />
					</IconButton>
				</Tooltip>
			</Link>
			<Link to={`${USERS}/edit/${id}`}>
				<Tooltip title="Редактировать пользователя">
					<IconButton color="primary">
						<EditIcon />
					</IconButton>
				</Tooltip>
			</Link>
			<Popover
				onAgree={handleUserDelete(id)}
				title="Удалить пользователя?"
				agreeText="Удалить"
				cancelText="Отмена"
			>
				{(setButtonRef: (node: any) => void, onClick) => (
					<Tooltip title="Удалить пользователя">
						<IconButton color="secondary" buttonRef={setButtonRef} onClick={onClick}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				)}
			</Popover>
		</div>
	);

	return (
		<Grid rootComponent={GridRootContainer} rows={users} columns={COLUMNS}>
			<PagingState
				pageSize={pageSize}
				defaultCurrentPage={0}
				currentPage={currentPage}
				onCurrentPageChange={onCurrentPageChange}
				onPageSizeChange={onPageSizeChange}
			/>
			<SelectionState selection={selectedUsers} onSelectionChange={handleSelectUser} />
			<CustomPaging totalCount={total} />
			<IntegratedSelection />
			<VirtualTable
				messages={TABLE_MESSAGES}
				columnExtensions={[{ columnName: 'actions', align: 'right' }]}
			/>
			<TableSelection showSelectAll={true} />
			<TableActions actions={renderActions} />
			<TableHeaderRow />
			<PagingPanel pageSizes={TABLE_PAGE_SIZES} messages={TABLE_PAGINATION_MESSAGES} />
		</Grid>
	);
};

export default withStyles(styles)(UsersTable);
