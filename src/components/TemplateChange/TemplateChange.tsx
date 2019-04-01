import React, { FC, ReactNode, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';

import { withForm } from '../../hocs';
import Options from './Options';
import Tasks from './Tasks';
import RestrictionsTable from './RestrictionsTable';
import Review from './Review';
import { ITask, IValues, IErrors, SetValue, SetError } from './types';

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
	const [activeStep, setActiveStep]: [number, (key: number) => void] = useState(0);

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
		console.log('completed');
	};

	const renderActions = (): ReactNode => (
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

	const renderStepper = (): ReactNode => (
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
				<StepLabel>Проверка </StepLabel>
			</Step>
		</Stepper>
	);

	const renderContent = (): ReactNode => (
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
			{isThirdStep && <RestrictionsTable />}
			{isFourthStep && <Review />}
			{renderActions()}
		</div>
	);

	return (
		<section className={classes.container}>
			{renderStepper()}
			{renderContent()}
		</section>
	);
};

export default withForm(withStyles(styles)(TemplateChange));
