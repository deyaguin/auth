import React, { FC, ReactNode, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { TEMPLATES } from '../../constants/routes';
import TemplateView from '../TemplateView';
import OptionsForm from '../OptionsForm';
import Tasks from '../Tasks';
import RestrictionsTable from '../RestrictionsTable';
import RestrictionsFilter from '../RestrictionsFilter';
import {
	ITask,
	IValues,
	IErrors,
	SetValue,
	SetError,
	TemplateCreate,
	TemplateUpdate,
} from '../../types';

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
			minWidth: 140,
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
		link: {
			textDecoration: 'none',
		},
		optionsFormWrapper: {
			flexGrow: 1,
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
	action: TemplateCreate | TemplateUpdate;
}

const TemplateChange: FC<ITemplateChangeProps> = ({
	classes,
	values,
	errors,
	setValue,
	setError,
	tasks,
	action,
}) => {
	const [activeStep, setActiveStep]: [number, (activeStep: number) => void] = useState(0);

	const [optionsValues, setOptionsValues]: [IValues, (optionsValues: IValues) => void] = useState({
		comment: '',
		name: '',
		tags: '',
	} as IValues);

	const [tasksValues, setTasksValues]: [IValues, (tasksValues: IValues) => void] = useState(
		{} as IValues,
	);

	const isFirstStep: boolean = activeStep === 0;

	const isSecondStep: boolean = activeStep === 1;

	const isThirdStep: boolean = activeStep === 2;

	const isFourthStep: boolean = activeStep === 3;

	const handleNextStep = (): void => {
		switch (activeStep) {
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

	const handleSetOptions = (optionsValues: IValues): void => {
		setOptionsValues(optionsValues);
		setActiveStep(activeStep + 1);
	};

	const handlePrevStep = (): void => {
		setActiveStep(activeStep - 1);
	};

	const handleComplete = (): void => {
		const { name, comment, tags, id, selectedTasks } = values;
		action({ id, name, comment, tags, tasks: selectedTasks });
	};

	const renderOptionsActions = (): ReactNode => (
		<Grid item={true} container={true} spacing={16} justify="center">
			<Grid item={true}>
				<Button
					className={classes.button}
					color="primary"
					variant="outlined"
					disabled={activeStep === 0}
					onClick={handlePrevStep}
				>
					Назад
				</Button>
			</Grid>
			<Grid item={true}>
				<Button className={classes.button} color="primary" variant="outlined" type="submit">
					Далее
				</Button>
			</Grid>
		</Grid>
	);

	const actions: ReactNode = !isFirstStep && (
		<Grid item={true} container={true} spacing={16} justify="center">
			<Grid item={true}>
				<Button
					className={classes.button}
					color="primary"
					variant="outlined"
					disabled={activeStep === 0}
					onClick={handlePrevStep}
				>
					Назад
				</Button>
			</Grid>
			{isFourthStep ? (
				<Grid item={true}>
					<Link to={TEMPLATES} className={classes.link}>
						<Button
							className={classes.button}
							color="primary"
							variant="outlined"
							onClick={handleComplete}
							type="submit"
						>
							Готово
						</Button>
					</Link>
				</Grid>
			) : (
				<Grid item={true}>
					<Button
						className={classes.button}
						color="primary"
						variant="outlined"
						onClick={handleNextStep}
						type="submit"
					>
						Далее
					</Button>
				</Grid>
			)}
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
				<Grid item={true} container={true} className={classes.optionsFormWrapper}>
					<OptionsForm
						initialValues={optionsValues}
						formActions={renderOptionsActions()}
						onSubmit={handleSetOptions}
					/>
				</Grid>
			)}
			{isSecondStep && (
				<Grid className={classes.tasksWrapper} container={true} item={true}>
					<Tasks selectedTasks={tasksValues} setValue={setTasksValues} tasks={tasks} />
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
				<TemplateView
					name={values.name}
					tags={values.tags}
					comment={values.comment}
					tasks={values.selectedTasks}
				/>
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
