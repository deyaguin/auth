import React, { FC, Fragment, ChangeEvent, ReactNode, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import { SetValue, SetError, IValues, IErrors, SetLimit, SetOffset } from '../types';
import ProfileForm from '../ProfileForm';
import UserAccessRights from '../UserAccessRights';

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
	templates: Array<{ id: string; name: string; comment: string }>;
	filters: { [name: string]: string };
	limit: number;
	offset: number;
	total: number;
	setLimit: SetLimit;
	setOffset: SetOffset;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
}

enum TABS {
	profile,
	restrictions,
}

const UserChange: FC<IUserChangeProps> = ({
	classes,
	values,
	errors,
	setValue,
	setError,
	templates,
	filters,
	limit,
	offset,
	total,
	setLimit,
	setOffset,
	setFilters,
	clearFilters,
}) => {
	const [selectedTab, setSelectedTab]: [TABS, (selectedTab: TABS) => void] = useState(TABS.profile);
	console.log(values);

	const handleSelectTab = (e: ChangeEvent<{}>, value: TABS) => setSelectedTab(value);

	const renderRestrictions = (): ReactNode =>
		selectedTab === TABS.restrictions && <Fragment>restrictions</Fragment>;

	return (
		<Grid container={true} direction="column" wrap="nowrap">
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
				wrap="nowrap"
			>
				{selectedTab === TABS.profile && (
					<ProfileForm values={values} errors={errors} setValue={setValue} setError={setError} />
				)}
				{selectedTab === TABS.restrictions && (
					<UserAccessRights
						templates={templates}
						filters={filters}
						setFilters={setFilters}
						clearFilters={clearFilters}
						limit={limit}
						offset={offset}
						total={total}
						setLimit={setLimit}
						setOffset={setOffset}
					/>
				)}
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(UserChange);
