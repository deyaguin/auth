import React, { FC, ReactNode, useEffect } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import { SetLimit, SetOffset, ITemplate, IFilters, SelectedItem, IValues } from '../../types';
import TemplateFilter from '../TemplatesFilter';
import TemplatesTable from '../TemplatesTable';

const styles = createStyles({
	container: {
		flexGrow: 1,
	},
	paper: {
		height: '100%',
		width: '100%',
	},
	tableWrapper: {
		flexGrow: 1,
	},
});

interface IUserTemplatesProps extends WithStyles<typeof styles> {
	templates: ITemplate[];
	filters: IFilters;
	limit: number;
	offset: number;
	total: number;
	setLimit: SetLimit;
	setOffset: SetOffset;
	actions?: ReactNode;
	selectedItems: SelectedItem[];
	setFilters: (filters: IValues) => void;
	clearFilters: () => void;
	onSelectItems: (items: SelectedItem[]) => void;
	clearSelectedItems?: () => void;
}

const UserTemplates: FC<IUserTemplatesProps> = ({
	classes,
	templates,
	filters,
	limit,
	offset,
	total,
	setLimit,
	setOffset,
	setFilters,
	clearFilters,
	actions,
	onSelectItems,
	selectedItems,
	clearSelectedItems,
}) => {
	useEffect(() => {
		if (clearSelectedItems) {
			clearSelectedItems();
		}
	}, []);

	const currentPage: number = limit / offset;

	const handlePageSizeChange = (pageSize: number): void => setLimit(pageSize);

	const handleCurrentPageChange = (currentPageValue: number): void =>
		setOffset(currentPageValue * limit);

	const actionsElement: ReactNode = actions && (
		<Grid item={true} container={true} justify="center" alignItems="flex-end" spacing={16}>
			{actions}
		</Grid>
	);

	return (
		<Fade in={true} timeout={400}>
			<Grid
				className={classes.container}
				container={true}
				item={true}
				direction="column"
				spacing={24}
				alignItems="center"
				wrap="nowrap"
			>
				<Grid item={true} container={true}>
					<TemplateFilter filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
				</Grid>
				<Grid className={classes.tableWrapper} item={true} container={true}>
					<Paper className={classes.paper}>
						<TemplatesTable
							selectable={true}
							currentPage={currentPage}
							pageSize={limit}
							templates={templates}
							total={total}
							onPageSizeChange={handlePageSizeChange}
							onCurrentPageChange={handleCurrentPageChange}
							onSelectItems={onSelectItems}
							selectedItems={selectedItems}
						/>
					</Paper>
				</Grid>
				{actionsElement}
			</Grid>
		</Fade>
	);
};

export default withStyles(styles)(UserTemplates);
