import React, { FC, useState, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { USERS } from '../../constants/routes';
import { Page, ProfileForm, UserRestrictions } from '../../components';

enum TABS {
	profile,
	restrictions,
}

const styles = (theme: Theme) =>
	createStyles({
		content: {
			flexGrow: 1,
			padding: theme.spacing.unit * 3,
		},
		link: {
			textDecoration: 'none',
		},
	});

interface ITask {
	id: string;
	name: string;
	operations: Array<{ id: string; name: string }>;
}

interface IUser {
	id: string;
	login: string;
	tag?: string;
	profile?: { [propName: string]: string };
	tasks?: ITask[];
}

interface IUserEditProps extends RouteComponentProps<{ id: string }>, WithStyles<typeof styles> {
	getUser: (id: string) => IUser;
}

const UserEdit: FC<IUserEditProps> = ({ classes, match, getUser }) => {
	const { tasks = [], profile, ...rest }: IUser = getUser(match.params.id);

	const [selectedTab, setSelectedTab]: [TABS, (selectedTab: TABS) => void] = useState(TABS.profile);

	const handleSelectTab = (e: ChangeEvent<{}>, value: TABS) => setSelectedTab(value);

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
					{selectedTab === TABS.profile && <ProfileForm initialValues={{ ...rest, ...profile }} />}
					{selectedTab === TABS.restrictions && (
						<UserRestrictions
							tasks={tasks.reduce(
								(acc: { [id: string]: ITask }, item: ITask) => ({ ...acc, [item.id]: item }),
								{},
							)}
						/>
					)}
				</Grid>
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(UserEdit);
