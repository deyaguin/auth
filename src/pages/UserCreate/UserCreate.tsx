import React, { FC, Fragment, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { IValues } from '../../types';
import { USERS } from '../../constants/routes';
import { PROFILE_SCHEMA } from '../../constants';
import { Page, ProfileForm, UserTemplates } from '../../components';

enum TABS {
	profile,
	templates,
}

const styles = (theme: Theme) =>
	createStyles({
		button: {
			minWidth: 260,
		},
		container: {
			paddingBottom: theme.spacing.unit * 2,
			paddingLeft: theme.spacing.unit * 2,
			paddingRight: theme.spacing.unit * 2,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing.unit * 3,
		},
		link: {
			textDecoration: 'none',
		},
	});

interface IUserCreateProps extends RouteComponentProps, WithStyles<typeof styles> {
	templates: Array<{ id: string; name: string; comment: string }>;
	filters: { [name: string]: string };
	limit: number;
	offset: number;
	total: number;
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
	setSnackbar: (message: string, type?: string) => void;
}

const UserCreate: FC<IUserCreateProps> = ({
	classes,
	history,
	templates,
	filters,
	limit,
	offset,
	total,
	setLimit,
	setOffset,
	setFilters,
	clearFilters,
	setSnackbar,
}) => {
	useEffect(
		() => () => {
			clearFilters();
			setOffset(0);
			setLimit(20);
		},
		[],
	);

	const [profileValues, setProfileValues]: [IValues, (profileValues: IValues) => void] = useState({
		...PROFILE_SCHEMA.reduce((acc, item) => ({ ...acc, [item.name]: '' }), {}),
	});

	const [selectedTab, setSelectedTab]: [TABS, (selectedTab: TABS) => void] = useState(TABS.profile);

	const [selectedTemplates, setSelectedTemplates]: [
		string[],
		(selectedTempates: string[]) => void
	] = useState([] as string[]);

	const handleSetSelelectedTemplates = (values: any) => {
		setSelectedTemplates(values);
	};

	const handleSetProfileValues = (values: IValues): void => {
		setProfileValues(values);

		setSelectedTab(TABS.templates);
	};

	const handleProfile = (): void => {
		setSelectedTab(TABS.profile);
	};

	const handleSave = (): void => {
		console.log({ ...profileValues, templates: selectedTemplates });

		setSnackbar('Пользователь успешно создан', 'success');

		history.replace(USERS);
	};

	return (
		<Page
			headerTitle="Создание пользователя"
			actions={[
				<Link key="cancel" className={classes.link} to={USERS}>
					<Button variant="contained" color="primary">
						Закрыть
					</Button>
				</Link>,
			]}
		>
			<Grid
				className={classes.container}
				container={true}
				direction="column"
				wrap="nowrap"
				spacing={24}
			>
				<Grid item={true}>
					<Tabs value={selectedTab} textColor="primary" indicatorColor="primary" centered={true}>
						<Tab disabled={true} label="Профиль" />
						<Tab disabled={true} label="Права доступа" />
					</Tabs>
				</Grid>
				{selectedTab === TABS.profile && (
					<ProfileForm
						initialValues={profileValues}
						onSubmit={handleSetProfileValues}
						formActions={
							<Grid item={true}>
								<Button className={classes.button} type="submit" color="primary" variant="outlined">
									Далее
								</Button>
							</Grid>
						}
					/>
				)}
				{selectedTab === TABS.templates && (
					<UserTemplates
						onSelectTemplate={handleSetSelelectedTemplates}
						templates={templates}
						filters={filters}
						setFilters={setFilters}
						clearFilters={clearFilters}
						limit={limit}
						offset={offset}
						total={total}
						setLimit={setLimit}
						setOffset={setOffset}
						actions={
							<Fragment>
								<Grid item={true}>
									<Button
										onClick={handleProfile}
										className={classes.button}
										color="primary"
										variant="outlined"
									>
										Назад
									</Button>
								</Grid>
								<Grid item={true}>
									<Button
										onClick={handleSave}
										className={classes.button}
										color="primary"
										variant="outlined"
									>
										Сохранить
									</Button>
								</Grid>
							</Fragment>
						}
					/>
				)}
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(UserCreate);
