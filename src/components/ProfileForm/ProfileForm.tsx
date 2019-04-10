import React, { FC, ChangeEvent, ReactNode, Fragment } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { PROFILE_SCHEMA } from '../../constants';
import { SetValue, SetError, IValues, IErrors } from '../types';

const styles = createStyles({
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
		<Fragment>
			{renderField('Логин', 'login', true)}
			{PROFILE_SCHEMA.map(item => renderField(item.title, item.name, item.required))}
		</Fragment>
	);
};

export default withStyles(styles)(ProfileForm);
