import React, { FC, ReactNode } from 'react';
import * as Yup from 'yup';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Formik, FormikActions, FormikProps, Form, Field, FieldProps } from 'formik';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import { PROFILE_SCHEMA } from '../../constants';
import { IValues } from '../../types';

const styles = createStyles({
	actionsWrapper: {
		flexGrow: 1,
	},
	container: {
		flexGrow: 1,
		height: '100%',
	},
	form: {
		height: '100%',
	},
	textField: {
		width: 500,
	},
});

interface IProfileFormProps extends WithStyles<typeof styles> {
	initialValues: IValues;
	formActions?: ReactNode;
	onSubmit: (values: IValues) => void;
}

const ValidationSchema: Yup.Schema<IValues> = Yup.object().shape({
	...PROFILE_SCHEMA.reduce(
		(acc, item) => ({
			...acc,
			[item.name]: item.required
				? Yup.string().required('Необходимо ввести значение')
				: Yup.string(),
		}),
		{},
	),
});

const ProfileForm: FC<IProfileFormProps> = ({ classes, initialValues, onSubmit, formActions }) => {
	const profileSchemaSort = (a: { required: boolean }, b: { required: boolean }) => {
		if (a.required === true && b.required === false) {
			return -1;
		}

		if (a.required === false && b.required === true) {
			return 1;
		}

		return 0;
	};

	const handleSubmit = (values: IValues, actions: FormikActions<IValues>): void => {
		onSubmit(values);
	};

	const renderTextField = (label: string, fieldName: string, required: boolean) => ({
		field,
		form,
	}: FieldProps<IValues>): ReactNode => (
		<TextField
			{...field}
			required={required}
			className={classes.textField}
			fullWidth={true}
			label={label}
			InputLabelProps={{
				shrink: true,
			}}
			variant="outlined"
			error={
				form.touched[fieldName] &&
				Boolean(form.errors[fieldName] ? Boolean(form.errors[fieldName]) : false)
			}
			helperText={form.touched[fieldName] && form.errors[fieldName] ? form.errors[fieldName] : ' '}
		/>
	);

	const renderFormField = (label: string, fieldName: string, required: boolean): ReactNode => (
		<Grid item={true} key={fieldName}>
			<Field name={fieldName} render={renderTextField(label, fieldName, required)} />
		</Grid>
	);

	const renderForm = (form: FormikProps<IValues>): ReactNode => (
		<Form className={classes.form} noValidate={true}>
			<Grid
				className={classes.container}
				container={true}
				item={true}
				direction="column"
				spacing={16}
				alignItems="center"
			>
				{PROFILE_SCHEMA.sort(profileSchemaSort).map(item =>
					renderFormField(item.title, item.name, item.required),
				)}
				{formActions && (
					<Grid
						className={classes.actionsWrapper}
						item={true}
						container={true}
						justify="center"
						alignItems="flex-end"
					>
						{formActions}
					</Grid>
				)}
			</Grid>
		</Form>
	);

	return (
		<Fade in={true}>
			<Grid
				className={classes.container}
				container={true}
				item={true}
				direction="column"
				spacing={24}
				alignItems="center"
			>
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					render={renderForm}
					validationSchema={ValidationSchema}
				/>
			</Grid>
		</Fade>
	);
};

export default withStyles(styles)(ProfileForm);
