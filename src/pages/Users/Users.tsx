import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { USER_CREATE } from '../../constants/routes';
import { Page, UsersTable, UsersFilter } from '../../components';

const styles = createStyles({
	link: {
		textDecoration: 'none',
	},
});

interface IUsersProps extends WithStyles<typeof styles> {
	users: Array<{ id: string; login: string }>;
	loading: boolean;
	limit: number;
	offset: number;
	total: number;
	filters: { [name: string]: string };
	userDelete: (id: string) => void;
	usersList: () => void;
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
	setSnackbar: (message: string, type?: string) => void;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
}

const Users: FC<IUsersProps> = ({
	classes,
	users,
	loading,
	userDelete,
	limit,
	total,
	offset,
	setLimit,
	setOffset,
	setSnackbar,
	clearFilters,
	setFilters,
	filters,
}) => {
	const [selectedUsers, setSelecetedUsers] = useState([]);

	const handleDelete = (id: string): void => {
		userDelete(id);

		setSnackbar('Пользователь успешно удален', 'success');
	};

	const handlePageSizeChange = (pageSize: number): void => {
		setLimit(pageSize);
	};

	const handleCurrentPageChange = (currentPage: number): void => {
		setOffset(currentPage * limit);
	};

	return (
		<Page
			actions={[
				<Link key="assign-template" className={classes.link} to={USER_CREATE}>
					<Button variant="contained" color="primary" disabled={selectedUsers.length < 1}>
						Применить шаблон
					</Button>
				</Link>,
				<Link key="new-user" className={classes.link} to={USER_CREATE}>
					<Button variant="contained" color="primary">
						Создать нового пользователя
					</Button>
				</Link>,
			]}
			filters={
				<UsersFilter clearFilters={clearFilters} setFilters={setFilters} filters={filters} />
			}
			headerTitle="Пользователи"
		>
			<UsersTable
				pageSize={limit}
				currentPage={offset / limit}
				total={total}
				onPageSizeChange={handlePageSizeChange}
				onCurrentPageChange={handleCurrentPageChange}
				users={users}
				userDelete={handleDelete}
				onSelectUsers={setSelecetedUsers}
				selectedUsers={selectedUsers}
			/>
		</Page>
	);
};

export default withStyles(styles)(Users);
