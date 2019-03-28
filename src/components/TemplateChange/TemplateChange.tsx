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

type SetValue = (key: string, value: any) => void;

type SetError = (key: string, value: boolean) => void;

const STEPS: {
	[name: string]: {
		label: string;
		render: (
			setValue: SetValue,
			values: { [name: string]: boolean },
			errors: { [name: string]: boolean },
		) => ReactNode;
	};
} = {
	0: {
		label: 'Укажите параметры шаблона',
		render: (setValue, values, errors) => (
			<Options values={values} errors={errors} setValue={setValue} />
		),
	},
	1: {
		label: 'Выберите задачи',
		render: (values: any) => <Tasks {...values} />,
	},
	2: {
		label: 'Добавьте ограничения',
		render: (values: any) => <RestrictionsTable {...values} />,
	},
	3: {
		label: 'review',
		render: (values: any) => <Review {...values} />,
	},
};

const INITIAL_VALUES = {
	comment: '',
	name: '',
	tags: '',
};

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
	values: { [name: string]: any };
	errors: { [name: string]: boolean };
	setError: SetError;
	setValue: SetValue;
}

const TemplateChange: FC<ITemplateChangeProps> = ({
	classes,
	values,
	errors,
	setValue,
	setError,
}) => {
	const [activeStep, setActiveStep]: [number, (key: number) => void] = useState(0);

	const handleNextStep = () => {
		switch (activeStep) {
			case 0: {
				if (!values.name) {
					setError('name', true);
					return;
				}
			}
			case 1:
				setActiveStep(activeStep + 1);
			case 2:
				setActiveStep(activeStep + 1);
		}

		setActiveStep(activeStep + 1);
	};

	const handlePrevStep = () => {
		setActiveStep(activeStep - 1);
	};

	const handleComplete = () => {
		console.log('completed');
	};

	const renderActions: () => ReactNode = () => {
		const isLastStep = activeStep === 3;

		return (
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
					onClick={isLastStep ? handleComplete : handleNextStep}
				>
					{isLastStep ? 'Готово' : 'Далее'}
				</Button>
			</div>
		);
	};

	return (
		<section className={classes.container}>
			<Stepper activeStep={activeStep}>
				{Object.keys(STEPS).map((key: string) => (
					<Step key={key}>
						<StepLabel>{STEPS[key].label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div className={classes.content}>
				{STEPS[activeStep].render(setValue, values, errors)}
				{renderActions()}
			</div>
		</section>
	);
};

export default withForm(withStyles(styles)(TemplateChange));
