import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { USERS } from '../../constants/routes';
import { ITemplate } from '../../types';
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
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
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
}) => {
	const [selectedTemplates, setSelectedTemplates]: [
		string[],
		(selectedTempates: string[]) => void
	] = useState([] as string[]);

	const handleSetSelelectedTemplates = (values: any) => {
		setSelectedTemplates(values);
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
					onSelectTemplate={handleSetSelelectedTemplates}
					templates={templates}
					filters={filters}
					setFilters={setFilters}
					clearFilters={clearFilters}
					limit={limit}
					offset={offset}
					total={total}
					setLimit={setLimit}
					setOffset={setOffset}
				/>
				<Grid container={true} item={true} direction="row" justify="center" spacing={24}>
					<Grid item={true}>
						<Button className={classes.button} variant="outlined" color="primary">
							Перезаписать
						</Button>
					</Grid>
					<Grid item={true}>
						<Button className={classes.button} variant="outlined" color="primary">
							Перезаписать частично
						</Button>
					</Grid>
					<Grid item={true}>
						<Button className={classes.button} variant="outlined" color="primary">
							Добавить
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(AssignTemplates);
