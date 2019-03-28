import React, { FC } from 'react';
import classNames from 'classnames';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = (theme: Theme) =>
	createStyles({
		commentField: {
			minHeight: 120,
		},
		container: {
			'& > div:nth-child(n + 2)': {
				marginTop: theme.spacing.unit * 3,
			},
			display: 'flex',
			flexDirection: 'column',
		},
		field: {
			width: 600,
		},
	});

interface IOprionsProps extends WithStyles<typeof styles> {
	setValue: (key: string, value: any) => void;
	errors: { [name: string]: boolean };
	values: { [name: string]: any };
}

const Options: FC<IOprionsProps> = ({ classes, setValue, errors, values }) => {
	const handleSetValue = (key: string) => (e: any) => {
		setValue(key, e.currentTarget.value);
	};

	return (
		<div className={classes.container}>
			<TextField
				onChange={handleSetValue('name')}
				required={true}
				className={classes.field}
				label="Название"
				variant="outlined"
				value={values.name}
				error={errors.name}
				helperText={errors.name && 'Введите значение'}
			/>
			<TextField
				onChange={handleSetValue('tags')}
				className={classes.field}
				label="Теги"
				variant="outlined"
				value={values.tags}
			/>
			<TextField
				onChange={handleSetValue('comment')}
				className={classNames(classes.commentField, classes.field)}
				multiline={true}
				label="Комментарий"
				variant="outlined"
				rows={6}
				value={values.comment}
			/>
		</div>
	);
};

export default withStyles(styles)(Options);
