import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { TEMPLATE_CREATE } from '../../constants/routes';
import { Page, TemplatesTable } from '../../components';

const styles = createStyles({
	link: {
		textDecoration: 'none',
	},
});

interface ITemplateProps extends WithStyles<typeof styles> {
	loading: boolean;
	templates: Array<{ id: string; name: string; comment: string }>;
	limit: number;
	offset: number;
	total: number;
	filters: { [name: string]: boolean | number | string };
	templateDelete: (id: string) => void;
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
	setSnackbar: (message: string, type?: string) => void;
	setFilters: (filters: { [name: string]: boolean | number | string }) => void;
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
	const handleDelete = (id: string) => {
		templateDelete(id);

		setSnackbar('Шаблон успешно удален', 'success');
	};

	const handlePageSizeChange = (pageSize: number) => {
		setLimit(pageSize);
	};

	const handleCurrentPageChange = (currentPage: number) => {
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
		>
			<TemplatesTable
				pageSize={limit}
				currentPage={offset / limit}
				total={total}
				onPageSizeChange={handlePageSizeChange}
				onCurrentPageChange={handleCurrentPageChange}
				templates={templates}
				templateDelete={handleDelete}
				clearFilters={clearFilters}
				setFilters={setFilters}
				filters={filters}
			/>
		</Page>
	);
};

export default withStyles(styles)(Templates);
