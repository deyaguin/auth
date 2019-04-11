import React, { FC, ChangeEvent } from 'react';
import classNames from 'classnames';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

import { IValues, IErrors, SetValue } from '../../types';

const styles = (theme: Theme) =>
	createStyles({
		commentField: {
			minHeight: 120,
		},
		field: {
			width: 600,
		},
	});

interface IOprionsProps extends WithStyles<typeof styles> {
	setValue: SetValue;
	errors: IErrors;
	values: IValues;
}

const Options: FC<IOprionsProps> = ({ classes, setValue, errors, values }) => {
	const handleSetValue = (key: string) => (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	): void => {
		setValue(key, e.currentTarget.value);
	};

	return (
		<Fade in={true} timeout={400}>
			<Grid container={true} direction="column" spacing={24} alignItems="center">
				<Grid item={true}>
					<TextField
						onChange={handleSetValue('name')}
						required={true}
						className={classes.field}
						label="Название"
						variant="outlined"
						value={values.name || ''}
						error={errors.name}
						helperText={errors.name && 'Введите значение'}
					/>
				</Grid>
				<Grid item={true}>
					<TextField
						onChange={handleSetValue('tags')}
						className={classes.field}
						label="Теги"
						variant="outlined"
						value={values.tags || ''}
					/>
				</Grid>
				<Grid item={true}>
					<TextField
						onChange={handleSetValue('comment')}
						className={classNames(classes.commentField, classes.field)}
						multiline={true}
						label="Комментарий"
						variant="outlined"
						rows={6}
						value={values.comment || ''}
					/>
				</Grid>
			</Grid>
		</Fade>
	);
};

export default withStyles(styles)(Options);
