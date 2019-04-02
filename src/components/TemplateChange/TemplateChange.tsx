import React, { FC, ReactNode, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import Options from '../Options';
import Tasks from '../Tasks';
import RestrictionsTable from '../RestrictionsTable';
import Review from '../Review/Review';
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
		container: {
			'& > div:nth-child(n + 2)': { marginTop: theme.spacing.unit * 3 },
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
		},
		content: {
			alignItems: 'center',
			display: 'flex',
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'space-between',
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
	const [activeStep, setActiveStep]: [number, (key: number) => void] = useState(2);

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
		<div className={classes.actions}>
			<Button
				color="primary"
				variant="contained"
				disabled={activeStep === 0}
				onClick={handlePrevStep}
			>
				Назад
			</Button>
			<Button
				color="primary"
				variant="contained"
				onClick={isFourthStep ? handleComplete : handleNextStep}
			>
				{isFourthStep ? 'Готово' : 'Далее'}
			</Button>
		</div>
	);

	const stepper: ReactNode = (
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
	);

	const content: ReactNode = (
		<div className={classes.content}>
			{isFirstStep && <Options values={values} errors={errors} setValue={setValue} />}
			{isSecondStep && (
				<Tasks
					selectedTasks={values.selectedTasks}
					errors={errors}
					setValue={setValue}
					tasks={tasks}
				/>
			)}
			{isThirdStep && (
				<RestrictionsTable tasks={values.selectedTasks} setValue={setValue} errors={errors} />
			)}
			{isFourthStep && <Review values={values} />}
			{actions}
		</div>
	);

	return (
		<section className={classes.container}>
			{stepper}
			{content}
		</section>
	);
};

export default withStyles(styles)(TemplateChange);
