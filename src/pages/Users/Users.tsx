import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { USER_CREATE } from '../../constants/routes';
import { Page, UsersTable, UsersFilter } from '../../components';
import { SelectedItem } from '../../types';

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
	pageSelections: SelectedItem[];
	selectionsCount: number;
	setSelectedItems: (items: SelectedItem[]) => void;
	userDelete: (id: string) => void;
	usersList: () => void;
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
	setSnackbar: (message: string, type?: string) => void;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
	clearSelectedItems: () => void;
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
	selectionsCount,
	pageSelections,
	setSelectedItems,
	clearSelectedItems,
}) => {
	useEffect(() => clearSelectedItems(), []);

	const currentPage: number = offset / limit;

	const handleSetSelectedItems = (items: SelectedItem[]): void => {
		setSelectedItems(items);
	};

	const handleDelete = (id: string): void => {
		userDelete(id);

		setSnackbar('Пользователь успешно удален', 'success');
	};

	const handlePageSizeChange = (pageSize: number): void => {
		setLimit(pageSize);
	};

	const handleCurrentPageChange = (page: number): void => {
		setOffset(page * limit);
	};

	return (
		<Page
			actions={[
				<Link key="assign-template" className={classes.link} to={USER_CREATE}>
					<Button variant="contained" color="primary" disabled={selectionsCount < 1}>
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
				currentPage={currentPage}
				total={total}
				onPageSizeChange={handlePageSizeChange}
				onCurrentPageChange={handleCurrentPageChange}
				users={users}
				userDelete={handleDelete}
				onSelectItems={handleSetSelectedItems}
				selectedItems={pageSelections}
			/>
		</Page>
	);
};

export default withStyles(styles)(Users);
