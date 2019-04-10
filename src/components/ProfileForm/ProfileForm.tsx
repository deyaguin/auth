import React, { FC, ChangeEvent, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import { PROFILE_SCHEMA } from '../../constants';
import { SetValue, SetError, IValues, IErrors } from '../types';

const styles = createStyles({
	actionsWrapper: {
		flexGrow: 1,
	},
	container: {
		flexGrow: 1,
	},
	textField: {
		width: 500,
	},
});

interface IProfileFormProps extends WithStyles<typeof styles> {
	values: IValues;
	errors: IErrors;
	setValue: SetValue;
	setError: SetError;
}

const ProfileForm: FC<IProfileFormProps> = ({ classes, setValue, setError, values, errors }) => {
	const handleSetValue = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>): void =>
		setValue(fieldName, e.currentTarget.value);

	const renderField = (label: string, propName: string, required: boolean): ReactNode => (
		<Grid item={true} key={propName}>
			<TextField
				required={required}
				className={classes.textField}
				fullWidth={true}
				value={values[propName] || ''}
				onChange={handleSetValue(propName)}
				label={label}
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
			/>
		</Grid>
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
				{renderField('Логин', 'login', true)}
				{PROFILE_SCHEMA.map(item => renderField(item.title, item.name, item.required))}
				<Grid
					className={classes.actionsWrapper}
					item={true}
					container={true}
					justify="center"
					alignItems="flex-end"
				>
					<Button color="primary" variant="outlined">
						Сохранить
					</Button>
				</Grid>
			</Grid>
		</Fade>
	);
};

export default withStyles(styles)(ProfileForm);
