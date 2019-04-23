import React, { FC, useState } from 'react';
import { reduce, map } from 'ramda';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';

import { IUser, ITasks, ITask, ITemplate } from '../../types';
import { ASSIGN_TEMPLATES } from '../../constants/routes';
import { Page, RestrictionsTable } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
		button: {
			minWidth: 260,
		},
		container: {
			padding: theme.spacing.unit * 3,
		},
		content: {
			flexGrow: 1,
		},
		link: {
			textDecoration: 'none',
		},
	});

interface IConflictResolutionProps extends WithStyles<typeof styles>, RouteComponentProps {
	selectedUsers: string[];
	selectedTemplates: string[];
	getUser: (id: string) => IUser;
	getTemplate: (id: string) => ITemplate;
	setSelectedUsers: (users: string[]) => void;
	setSelectedTemplates: (templates: string[]) => void;
}

const ConflictResolution: FC<IConflictResolutionProps> = ({
	classes,
	location,
	getUser,
	getTemplate,
	selectedUsers,
	selectedTemplates,
	setSelectedUsers,
	setSelectedTemplates,
}) => {
	const [initialized, setInitialized]: [boolean, (initialized: boolean) => void] = useState(false);

	const { users: queryUsers, templates: queryTemplates } = queryString.parse(location.search);

	if (!initialized) {
		setInitialized(true);

		if (typeof queryUsers === 'string') {
			setSelectedUsers([queryUsers]);
		} else {
			setSelectedUsers(queryUsers || []);
		}

		if (typeof queryTemplates === 'string') {
			setSelectedTemplates([queryTemplates]);
		} else {
			setSelectedTemplates(queryTemplates || []);
		}
	}

	const [currentUserNumber, setCurrentUserNumber]: [
		number,
		(currentUserNumber: number) => void
	] = useState(0);

	const currentUser: IUser = getUser(selectedUsers[currentUserNumber]);

	const templates = map<string, ITemplate>(item => getTemplate(item), selectedTemplates);
	console.log(templates);

	console.log(currentUser);

	const handleApply = (): void => {
		setCurrentUserNumber(currentUserNumber + 1);
	};

	return (
		<Page
			actions={[
				<Link key="cancel" className={classes.link} to={ASSIGN_TEMPLATES}>
					<Button variant="contained" color="primary">
						Закрыть
					</Button>
				</Link>,
			]}
			headerTitle="Предварительный результат"
		>
			<Grid className={classes.container} container={true} direction="column" spacing={24}>
				<Grid container={true} item={true} justify="space-between">
					<Grid item={true}>
						<Typography variant="subheading">
							Пользователь: {currentUser && currentUser.login}
						</Typography>
					</Grid>
					<Grid item={true}>
						<Typography variant="subheading">
							Обработано: {currentUserNumber} из {selectedUsers.length}
						</Typography>
					</Grid>
				</Grid>
				<Grid className={classes.content} container={true} item={true}>
					<RestrictionsTable
						tasks={reduce(
							(acc: ITasks, item: ITask) => ({ ...acc, [item.id]: item }),
							{},
							currentUser ? currentUser.tasks || [] : [],
						)}
					/>
				</Grid>
				<Grid container={true} item={true} spacing={24} justify="center">
					<Grid item={true}>
						<Button
							onClick={handleApply}
							className={classes.button}
							variant="outlined"
							color="primary"
						>
							Применить
						</Button>
					</Grid>
					<Grid item={true}>
						<Button
							onClick={handleApply}
							className={classes.button}
							variant="outlined"
							color="primary"
						>
							Пропустить конфликты и применить
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(ConflictResolution);
