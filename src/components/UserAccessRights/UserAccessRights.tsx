import React, { FC, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { SetLimit, SetOffset } from '../types';
import TemplateFilter from '../TemplatesFilter';
import TemplatesTable from '../TemplatesTable';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			height: '100%',
			width: '100%',
		},
		tableWrapper: {
			flexGrow: 1,
		},
	});

interface IUserRestrictionsProps extends WithStyles<typeof styles> {
	templates: Array<{ id: string; name: string; comment: string }>;
	filters: { [name: string]: string };
	limit: number;
	offset: number;
	total: number;
	setLimit: SetLimit;
	setOffset: SetOffset;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
}

const UserAccessRights: FC<IUserRestrictionsProps> = ({
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
}) => {
	const handlePageSizeChange = (pageSize: number): void => {
		setLimit(pageSize);
	};

	const handleCurrentPageChange = (currentPage: number): void => {
		setOffset(currentPage * limit);
	};

	return (
		<Fragment>
			<Grid item={true} container={true}>
				<TemplateFilter filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
			</Grid>
			<Grid className={classes.tableWrapper} item={true} container={true}>
				<TemplatesTable
					currentPage={offset / limit}
					pageSize={limit}
					templates={templates}
					total={total}
					onPageSizeChange={handlePageSizeChange}
					onCurrentPageChange={handleCurrentPageChange}
				/>
			</Grid>
		</Fragment>
	);
};

export default withStyles(styles)(UserAccessRights);
