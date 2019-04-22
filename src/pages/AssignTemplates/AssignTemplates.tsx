import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { USERS, CONFLICT_RESOLUTION } from '../../constants/routes';
import { ITemplate, SelectedItem } from '../../types';
import { Page, UserTemplates } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
		button: {
			minWidth: 260,
		},
		container: {
			flexGrow: 1,
			padding: theme.spacing.unit * 3,
		},
		link: {
			textDecoration: 'none',
		},
	});

interface IAssignTemplatesProps extends WithStyles<typeof styles> {
	templates: ITemplate[];
	filters: { [name: string]: string };
	limit: number;
	offset: number;
	total: number;
	pageSelections: SelectedItem[];
	selectionsCount: number;
	setSelectedItems: (items: SelectedItem[]) => void;
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
	clearSelectedItems: () => void;
}

const AssignTemplates: FC<IAssignTemplatesProps> = ({
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
	clearSelectedItems,
	setSelectedItems,
	pageSelections,
	selectionsCount,
}) => {
	const handleSelectItems = (items: SelectedItem[]): void => {
		setSelectedItems(items);
	};

	return (
		<Page
			headerTitle="Применение нового шаблона"
			actions={[
				<Link key="cancel" className={classes.link} to={USERS}>
					<Button variant="contained" color="primary">
						Закрыть
					</Button>
				</Link>,
			]}
		>
			<Grid
				className={classes.container}
				direction="column"
				wrap="nowrap"
				container={true}
				spacing={24}
			>
				<UserTemplates
					onSelectItems={handleSelectItems}
					templates={templates}
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
					limit={limit}
					offset={offset}
					total={total}
					setLimit={setLimit}
					setOffset={setOffset}
					selectedItems={pageSelections}
					clearSelectedItems={clearSelectedItems}
				/>
				<Grid container={true} item={true} direction="row" justify="center" spacing={24}>
					<Grid item={true}>
						<Link className={classes.link} to={CONFLICT_RESOLUTION}>
							<Button
								className={classes.button}
								variant="outlined"
								color="primary"
								disabled={selectionsCount < 1}
							>
								Перезаписать
							</Button>
						</Link>
					</Grid>
					<Grid item={true}>
						<Link className={classes.link} to={CONFLICT_RESOLUTION}>
							<Button
								className={classes.button}
								variant="outlined"
								color="primary"
								disabled={selectionsCount < 1}
							>
								Перезаписать частично
							</Button>
						</Link>
					</Grid>
					<Grid item={true}>
						<Link className={classes.link} to={CONFLICT_RESOLUTION}>
							<Button className={classes.button} variant="outlined" color="primary">
								Добавить
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(AssignTemplates);
