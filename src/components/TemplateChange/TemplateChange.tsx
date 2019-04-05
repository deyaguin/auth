import React, { FC, ReactNode, useState, Fragment } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Options from '../Options';
import Tasks from '../Tasks';
import RestrictionsTable from '../RestrictionsTable';
import RestrictionsFilter from '../RestrictionsFilter';
import { ITask, IValues, IErrors, SetValue, SetError } from '../types';

const styles = (theme: Theme) =>
	createStyles({
		actions: {
			'& > button:nth-child(n+2)': {
				marginLeft: theme.spacing.unit * 2,
			},
			display: 'flex',
			justifyContent: 'center',
		},
		button: {
			minWidth: 100,
		},
		container: {
			flexGrow: 1,
			paddingBottom: theme.spacing.unit * 3,
			paddingLeft: theme.spacing.unit * 3,
			paddingRight: theme.spacing.unit * 3,
		},
		content: {
			flexGrow: 1,
			padding: `0 ${theme.spacing.unit * 2}`,
		},
		tableWrapper: {
			flexGrow: 1,
		},
		tasksWrapper: {
			flexGrow: 1,
		},
	});

interface ITemplateChangeProps extends WithStyles<typeof styles> {
	tasks: ITask[];
	values: IValues;
	errors: IErrors;
	setError: SetError;
	setValue: SetValue;
}

const TemplateChange: FC<ITemplateChangeProps> = ({
	classes,
	values,
	errors,
	setValue,
	setError,
	tasks,
}) => {
	const [activeStep, setActiveStep]: [number, (activeStep: number) => void] = useState(0);

	const isFirstStep: boolean = activeStep === 0;

	const isSecondStep: boolean = activeStep === 1;

	const isThirdStep: boolean = activeStep === 2;

	const isFourthStep: boolean = activeStep === 3;

	const handleNextStep = (): void => {
		switch (activeStep) {
			case 0: {
				if (!values.name) {
					setError('name', true);

					return;
				}
				break;
			}
			case 1:
				if (!values.selectedTasks || Object.keys(values.selectedTasks).length < 1) {
					setError('selectedTasks', true);

					return;
				}
				break;
			case 2:
				break;
		}

		setActiveStep(activeStep + 1);
	};

	const handlePrevStep = (): void => {
		setActiveStep(activeStep - 1);
	};

	const handleComplete = (): void => {
		console.log(values);
	};

	const actions: ReactNode = (
		<Grid item={true} container={true} spacing={16} justify="center">
			<Grid item={true}>
				<Button
					className={classes.button}
					color="primary"
					variant="contained"
					disabled={activeStep === 0}
					onClick={handlePrevStep}
				>
					Назад
				</Button>
			</Grid>
			<Grid item={true}>
				<Button
					className={classes.button}
					color="primary"
					variant="contained"
					onClick={isFourthStep ? handleComplete : handleNextStep}
				>
					{isFourthStep ? 'Готово' : 'Далее'}
				</Button>
			</Grid>
		</Grid>
	);

	const stepper: ReactNode = (
		<Grid item={true}>
			<Stepper activeStep={activeStep}>
				<Step>
					<StepLabel>Укажите параметры шаблона</StepLabel>
				</Step>
				<Step>
					<StepLabel>Выберите задачи</StepLabel>
				</Step>
				<Step>
					<StepLabel>Добавьте ограничения</StepLabel>
				</Step>
				<Step>
					<StepLabel>Предварительный просмотр </StepLabel>
				</Step>
			</Stepper>
		</Grid>
	);

	const content: ReactNode = (
		<Grid
			className={classes.content}
			direction="column"
			wrap="nowrap"
			container={true}
			item={true}
			spacing={16}
		>
			{isFirstStep && (
				<Grid item={true}>
					<Options values={values} errors={errors} setValue={setValue} />
				</Grid>
			)}
			{isSecondStep && (
				<Grid className={classes.tasksWrapper} container={true} item={true}>
					<Tasks
						selectedTasks={values.selectedTasks}
						errors={errors}
						setValue={setValue}
						tasks={tasks}
					/>
				</Grid>
			)}
			{isThirdStep && (
				<Fragment>
					<Grid item={true}>
						<RestrictionsFilter
							filters={{}}
							setFilters={(filters: any) => {}}
							clearFilters={() => {}}
						/>
					</Grid>
					<Grid className={classes.tableWrapper} container={true} item={true}>
						<RestrictionsTable tasks={values.selectedTasks} setValue={setValue} />
					</Grid>
				</Fragment>
			)}
			{isFourthStep && (
				<Fragment>
					<Grid container={true} item={true} spacing={24}>
						<Grid item={true}>
							<Grid item={true}>
								<Typography variant="subheading">Название:</Typography>
							</Grid>
							<Grid item={true}>
								<Typography variant="subheading">Теги:</Typography>
							</Grid>
							<Grid item={true}>
								<Typography variant="subheading">Комментарий: </Typography>
							</Grid>
						</Grid>
						<Grid item={true}>
							<Grid item={true}>
								<Typography variant="subheading">{values.name}</Typography>
							</Grid>
							<Grid item={true}>
								<Typography variant="subheading">{values.tags}</Typography>
							</Grid>
							<Grid item={true}>
								<Typography variant="subheading">{values.comment}</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item={true}>
						<RestrictionsFilter
							filters={{}}
							setFilters={(filters: any) => {}}
							clearFilters={() => {}}
						/>
					</Grid>
					<Grid className={classes.tableWrapper} container={true} item={true}>
						<RestrictionsTable editable={false} tasks={values.selectedTasks} />
					</Grid>
				</Fragment>
			)}
		</Grid>
	);

	return (
		<Grid
			className={classes.container}
			container={true}
			direction="column"
			wrap="nowrap"
			spacing={24}
		>
			{stepper}
			{content}
			{actions}
		</Grid>
	);
};

export default withStyles(styles)(TemplateChange);
