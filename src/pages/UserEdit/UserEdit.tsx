import React, { FC, useState, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { ITask, ITasks, IUser, IValues } from '../../types';
import { USERS } from '../../constants/routes';
import { Page, ProfileForm, UserRestrictions } from '../../components';

enum TABS {
	profile,
	restrictions,
}

const styles = (theme: Theme) =>
	createStyles({
		button: {
			minWidth: 140,
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

interface IUserEditProps extends RouteComponentProps<{ id: string }>, WithStyles<typeof styles> {
	getUser: (id: string) => IUser;
	setSnackbar: (message: string, type?: string) => void;
}

const UserEdit: FC<IUserEditProps> = ({ classes, match, getUser, setSnackbar }) => {
	const { tasks = [], profile, tag, ...rest }: IUser = getUser(match.params.id);

	const profileInitialValues: IValues = { ...rest, ...profile };

	const restricrionsInitialValues: ITasks = tasks.reduce(
		(acc: { [id: string]: ITask }, item: ITask) => ({ ...acc, [item.id]: item }),
		{},
	);

	const [selectedTab, setSelectedTab]: [TABS, (selectedTab: TABS) => void] = useState(TABS.profile);

	const handleSelectTab = (e: ChangeEvent<{}>, value: TABS) => setSelectedTab(value);

	const handleSaveProfile = (values: IValues): void => {
		console.log(values);
		setSnackbar('Профиль сохранен', 'success');
	};

	const handleSaveRestrictions = (values: IValues): void => {};

	return (
		<Page
			headerTitle="Редактирование пользователя"
			actions={[
				<Link key="cancel" className={classes.link} to={USERS}>
					<Button variant="contained" color="primary">
						Отмена
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
				</Grid>
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
						<ProfileForm
							initialValues={profileInitialValues}
							onSubmit={handleSaveProfile}
							formActions={
								<Grid item={true}>
									<Button
										className={classes.button}
										type="submit"
										color="primary"
										variant="outlined"
									>
										Сохранить
									</Button>
								</Grid>
							}
						/>
					)}
					{selectedTab === TABS.restrictions && (
						<UserRestrictions
							initialValues={restricrionsInitialValues}
							filters={{}}
							clearFilters={() => {}}
							setFilters={(filters: any) => {}}
							actions={
								<Grid item={true}>
									<Button
										className={classes.button}
										type="submit"
										color="primary"
										variant="outlined"
									>
										Сохранить
									</Button>
								</Grid>
							}
						/>
					)}
				</Grid>
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(UserEdit);
