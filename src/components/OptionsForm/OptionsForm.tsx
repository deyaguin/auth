import React, { FC, ChangeEvent, ReactNode } from 'react';
import classNames from 'classnames';
import * as Yup from 'yup';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {
	Formik,
	FormikActions,
	FormikProps,
	Form,
	Field,
	FieldProps,
	FormikFormProps,
} from 'formik';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

import { IValues } from '../../types';

const styles = (theme: Theme) =>
	createStyles({
		actionsWrapper: {
			flexGrow: 1,
		},
		commentField: {
			minHeight: 120,
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

interface IOprionsProps extends WithStyles<typeof styles> {
	initialValues: IValues;
	onSubmit: (values: IValues) => void;
	formActions?: ReactNode;
}

const ValidationSchema: Yup.Schema<IValues> = Yup.object().shape({
	comment: Yup.string(),
	name: Yup.string().required('Необходимо ввести значение'),
	tags: Yup.string(),
});

const Options: FC<IOprionsProps> = ({ classes, formActions, initialValues, onSubmit }) => {
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

	const renderForm = (): ReactNode => (
		<Form className={classes.form} noValidate={true}>
			<Grid
				className={classes.container}
				container={true}
				item={true}
				direction="column"
				spacing={16}
				alignItems="center"
			>
				<Grid item={true}>
					<Field name="name" render={renderTextField('Название', 'name', true)} />
				</Grid>
				<Grid item={true}>
					<Field name="tags" render={renderTextField('Теги', 'tags', false)} />
				</Grid>
				<Grid item={true}>
					<Field name="comment" render={renderTextField('Комментарий', 'comment', false)} />
				</Grid>
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
	console.log(initialValues);
	return (
		<Fade in={true} timeout={400}>
			<Grid container={true} direction="column" spacing={24} alignItems="center">
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={ValidationSchema}
					render={renderForm}
				/>
			</Grid>
		</Fade>
	);
};

export default withStyles(styles)(Options);
