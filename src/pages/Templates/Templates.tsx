import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { ITemplate } from '../../types';
import { TEMPLATE_CREATE } from '../../constants/routes';
import { Page, TemplatesTable, TemplatesFilter } from '../../components';

const styles = createStyles({
	link: {
		textDecoration: 'none',
	},
});

interface ITemplateProps extends WithStyles<typeof styles> {
	loading: boolean;
	templates: ITemplate[];
	limit: number;
	offset: number;
	total: number;
	filters: { [name: string]: string };
	templateDelete: (id: string) => void;
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
	setSnackbar: (message: string, type?: string) => void;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
}

const Templates: FC<ITemplateProps> = ({
	classes,
	loading,
	templates,
	limit,
	offset,
	total,
	filters,
	templateDelete,
	setLimit,
	setOffset,
	setSnackbar,
	setFilters,
	clearFilters,
}) => {
	useEffect(
		() => () => {
			clearFilters();
			setOffset(0);
			setLimit(20);
		},
		[],
	);

	const handleDelete = (id: string): void => {
		templateDelete(id);

		setSnackbar('Шаблон успешно удален', 'success');
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
				<Link key="new-template" className={classes.link} to={TEMPLATE_CREATE}>
					<Button variant="contained" color="primary">
						Создать новый шаблон
					</Button>
				</Link>,
			]}
			headerTitle="Шаблоны"
			filters={
				<TemplatesFilter clearFilters={clearFilters} setFilters={setFilters} filters={filters} />
			}
		>
			<TemplatesTable
				pageSize={limit}
				currentPage={offset / limit}
				total={total}
				onPageSizeChange={handlePageSizeChange}
				onCurrentPageChange={handleCurrentPageChange}
				templates={templates}
				templateDelete={handleDelete}
				editable={true}
				removable={true}
			/>
		</Page>
	);
};

export default withStyles(styles)(Templates);
