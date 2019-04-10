import React, { FC, useState } from 'react';
import { without } from 'ramda';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { SetLimit, SetOffset } from '../types';
import TemplateFilter from '../TemplatesFilter';
import TemplatesTable from '../TemplatesTable';

const styles = createStyles({
	container: {
		flexGrow: 1,
	},
	paper: {
		height: '100%',
	},
	tableWrapper: {
		flexGrow: 1,
	},
});

interface IUserTemplatesProps extends WithStyles<typeof styles> {
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
}) => {
	const [selectedTemplates, setSelectedTemplates] = useState([]);

	const handlePageSizeChange = (pageSize: number): void => {
		setLimit(pageSize);
	};

	const handleCurrentPageChange = (currentPage: number): void => {
		setOffset(currentPage * limit);
	};

	const handleSetSelelectedTemplates = (values: any) => {
		setSelectedTemplates(without(selectedTemplates, values));
	};

	return (
		<Fade in={true}>
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
							currentPage={offset / limit}
							pageSize={limit}
							templates={templates}
							total={total}
							onPageSizeChange={handlePageSizeChange}
							onCurrentPageChange={handleCurrentPageChange}
							onSelectTemplate={handleSetSelelectedTemplates}
							selectedTemplates={selectedTemplates}
						/>
					</Paper>
				</Grid>
				<Grid item={true} container={true} justify="center" alignItems="flex-end">
					<Button color="primary" variant="outlined">
						Сохранить
					</Button>
				</Grid>
			</Grid>
		</Fade>
	);
};

export default withStyles(styles)(UserTemplates);
