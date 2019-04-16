import React, { FC, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { ITask, ITasks } from '../../types';
import { RestrictionsTable, Tasks, RestrictionsFilter, Page } from '../../components';

enum STEPS {
	tasks,
	restrictions,
}

const styles = (theme: Theme) =>
	createStyles({
		button: {
			minWidth: 260,
		},
		container: {
			flexGrow: 1,
			padding: theme.spacing.unit * 3,
		},
		content: {
			flexGrow: 1,
		},
	});

interface IRestrictionsEditorProps extends RouteComponentProps, WithStyles<typeof styles> {
	setTasks: (tasks: ITasks) => void;
	tasks: ITask[];
	selectedTasks?: ITasks;
}

const RestrictionsEditor: FC<IRestrictionsEditorProps> = ({
	classes,
	tasks,
	selectedTasks = {},
	setTasks,
	history,
}) => {
	const [selectedStep, setSelectedStep]: [STEPS, (selectedStep: STEPS) => void] = useState(
		STEPS.tasks,
	);

	const isTasks: boolean = selectedStep === STEPS.tasks;

	const isRestrictions: boolean = selectedStep === STEPS.restrictions;

	const handleSetTasks = (values: ITasks): void => {
		setTasks(values);
	};

	const handleNext = (): void => {
		setSelectedStep(STEPS.restrictions);
	};

	const handlePrev = (): void => setSelectedStep(STEPS.tasks);

	const handleClose = (): void => history.goBack();

	const handleComplete = (): void => history.goBack();

	if (Object.keys(selectedTasks).length < 1) {
		history.goBack();

		return null;
	}

	return (
		<Page
			actions={[
				<Button key="close" color="primary" onClick={handleClose} variant="contained">
					Закрыть
				</Button>,
			]}
			headerTitle="Редактирование прав доступа"
		>
			<Grid
				direction="column"
				className={classes.container}
				container={true}
				spacing={24}
				wrap="nowrap"
			>
				{isRestrictions && (
					<Grid container={true} item={true}>
						<RestrictionsFilter
							filters={{}}
							clearFilters={() => {}}
							setFilters={(filters: { [propName: string]: string }) => {}}
						/>
					</Grid>
				)}
				<Grid container={true} item={true} className={classes.content}>
					{isTasks && (
						<Tasks selectedTasks={selectedTasks} tasks={tasks} setValue={handleSetTasks} />
					)}
					{isRestrictions && (
						<RestrictionsTable tasks={selectedTasks} setValue={handleSetTasks} editable={true} />
					)}
				</Grid>
				<Grid item={true} container={true} justify="center" spacing={16}>
					<Grid item={true}>
						<Button
							disabled={isTasks}
							className={classes.button}
							color="primary"
							variant="outlined"
							onClick={handlePrev}
						>
							Назад
						</Button>
					</Grid>
					<Grid item={true}>
						{isTasks && (
							<Button
								onClick={handleNext}
								className={classes.button}
								color="primary"
								variant="outlined"
							>
								Далее
							</Button>
						)}
						{isRestrictions && (
							<Button
								onClick={handleComplete}
								className={classes.button}
								color="primary"
								variant="outlined"
							>
								Готово
							</Button>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(RestrictionsEditor);
