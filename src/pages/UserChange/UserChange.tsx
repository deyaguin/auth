import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { USERS } from '../../constants/routes';
import { Page, ProfileForm, UserAccessRights } from '../../components';

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

interface IUserChangeProps extends RouteComponentProps, WithStyles<typeof styles> {
	templates: Array<{ id: string; name: string; comment: string }>;
	filters: { [name: string]: string };
	limit: number;
	offset: number;
	total: number;
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
	setFilters: (filters: { [name: string]: string }) => void;
	clearFilters: () => void;
}

const UserChange: FC<IUserChangeProps> = ({
	classes,
	match,
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
	useEffect(
		() => () => {
			clearFilters();
			setOffset(0);
			setLimit(20);
		},
		[],
	);
	const [selectedTab, setSelectedTab]: [TABS, (selectedTab: TABS) => void] = useState(TABS.profile);

	const headerTitle: string = 'Добавление пользователя';

	console.log(match);
	// console.log(values);
	console.log(filters);

	const handleSelectTab = (e: ChangeEvent<{}>, value: TABS) => setSelectedTab(value);

	return (
		<Page
			headerTitle={headerTitle}
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
					{selectedTab === TABS.profile && <ProfileForm />}
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
		</Page>
	);
};

export default withStyles(styles)(UserChange);
