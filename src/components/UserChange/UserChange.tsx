import React, { FC, Fragment, ChangeEvent, ReactNode, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { PROFILE_SCHEMA } from '../../constants';
import { SetValue, SetError, IValues, IErrors } from '../types';

const styles = (theme: Theme) =>
	createStyles({
		content: {
			flexGrow: 1,
			padding: theme.spacing.unit * 3,
		},
		textField: {
			width: 500,
		},
	});

interface IUserChangeProps extends WithStyles<typeof styles> {
	values: IValues;
	errors: IErrors;
	setValue: SetValue;
	setError: SetError;
}

enum TABS {
	profile,
	restrictions,
}

const UserChange: FC<IUserChangeProps> = ({ classes, values, errors, setValue, setError }) => {
	const [selectedTab, setSelectedTab]: [TABS, (selectedTab: TABS) => void] = useState(TABS.profile);
	console.log(values);

	const handleSelectTab = (e: ChangeEvent<{}>, value: TABS) => setSelectedTab(value);

	const handleSetValue = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>): void =>
		setValue(fieldName, e.currentTarget.value);

	const renderField = (label: string, propName: string): ReactNode => (
		<Grid item={true} key={propName}>
			<TextField
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

	const renderProfile = (): ReactNode =>
		selectedTab === TABS.profile && (
			<Fragment>
				{renderField('Логин', 'login')}
				{PROFILE_SCHEMA.map(item => renderField(item.title, item.name))}
			</Fragment>
		);

	const renderRestrictions = (): ReactNode =>
		selectedTab === TABS.restrictions && <Fragment>restrictions</Fragment>;

	return (
		<Grid container={true} direction="column">
			<Tabs
				value={selectedTab}
				onChange={handleSelectTab}
				textColor="primary"
				indicatorColor="primary"
				centered={true}
			>
				<Tab label="Профиль" />
				<Tab label="Права доступа" />
			</Tabs>
			<Grid
				className={classes.content}
				container={true}
				item={true}
				spacing={24}
				direction="column"
				alignItems="center"
			>
				{renderProfile()}
				{renderRestrictions()}
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(UserChange);
