import React, { FC, useState, ChangeEvent, ReactNode } from 'react';
import { reduce, map } from 'ramda';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { RESTRICTIONS_EDITOR } from '../../constants/routes';
import { IOperation, ITasks, IUser, IValues } from '../../types';
import { USERS } from '../../constants/routes';
import { Page, UserRestrictions } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
		button: {
			minWidth: 260,
		},
		container: {
			flexGrow: 1,
			padding: theme.spacing.unit * 3,
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing.unit * 3,
		},
		link: {
			textDecoration: 'none',
		},
		textField: {
			width: 500,
		},
	});

interface IUserEditProps extends RouteComponentProps<{ id: string }>, WithStyles<typeof styles> {
	getUser: (id: string) => IUser;
	setSnackbar: (message: string, type?: string) => void;
	selectedTasks: ITasks;
	setTasks: (tasks: ITasks) => void;
	clearRestrictionsEditor: () => void;
}

const UserEdit: FC<IUserEditProps> = ({
	classes,
	match,
	getUser,
	selectedTasks,
	setSnackbar,
	setTasks,
	clearRestrictionsEditor,
}) => {
	const { tasks = [], login, tags, ...rest }: IUser = getUser(match.params.id);

	const tasksToObject = reduce(
		(acc: IValues, { id, operations, ...restTask }: IValues) => ({
			...acc,
			[id]: {
				...restTask,
				id,
				operations: map((item: IOperation) => ({ ...item, selected: true }), operations),
			},
		}),
		{},
	);

	const restricrionsInitialValues: IValues = {
		tasks: { ...tasksToObject(tasks), ...selectedTasks },
	};

	const [restrictionsValues, setRestrictionsValues]: [
		{ tasks?: ITasks },
		(restrictionsValues: { tasks?: IValues }) => void
	] = useState(restricrionsInitialValues);

	const [loginValue, setLoginValue]: [string, (loginValue: string) => void] = useState(login);

	const [loginFieldTouched, setLoginFieldTouched]: [
		boolean,
		(loginValueTouched: boolean) => void
	] = useState(false);

	const handleSave = (): void => {
		setLoginFieldTouched(true);

		if (loginValue) {
			console.log(login, tagsValue, restrictionsValues);
			setSnackbar('Пользователь изменен', 'success');
		}
	};

	const handleSetLoginValue = (e: ChangeEvent<HTMLInputElement>): void => {
		setLoginValue(e.currentTarget.value);

		setLoginFieldTouched(true);
	};

	const [tagsValue, setTagsValue]: [string, (tagValue: string) => void] = useState(tags || '');

	const handleSetTagsValue = (e: ChangeEvent<HTMLInputElement>) => {
		setTagsValue(e.currentTarget.value);
	};

	const handleRestrictionsEditor = (): void => {
		setTasks(tasksToObject(tasks));
	};

	const renderLoginField = (): ReactNode => (
		<Grid item={true}>
			<TextField
				required={true}
				className={classes.textField}
				fullWidth={true}
				label="Логин"
				InputLabelProps={{
					shrink: true,
				}}
				variant="outlined"
				error={loginFieldTouched && !loginValue}
				helperText={loginFieldTouched && !loginValue && 'Необходимо ввести значение'}
				onChange={handleSetLoginValue}
				value={loginValue}
			/>
		</Grid>
	);

	const renderTagsField = (): ReactNode => (
		<Grid item={true} container={true}>
			<TextField
				value={tagsValue}
				fullWidth={true}
				variant="outlined"
				label="Теги"
				onChange={handleSetTagsValue}
			/>
		</Grid>
	);

	const renderActions = (): ReactNode => (
		<Grid item={true} container={true} justify="center" spacing={24}>
			<Grid item={true}>
				<Button onClick={handleSave} className={classes.button} variant="outlined" color="primary">
					Сохранить
				</Button>
			</Grid>
			<Grid item={true}>
				<Link className={classes.link} to={RESTRICTIONS_EDITOR}>
					<Button
						onClick={handleRestrictionsEditor}
						className={classes.button}
						color="primary"
						variant="outlined"
					>
						Перейти в конструктор прав
					</Button>
				</Link>
			</Grid>
		</Grid>
	);

	return (
		<Page
			headerTitle="Редактирование пользователя"
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
				<Grid container={true} item={true} spacing={24} wrap="nowrap">
					{renderLoginField()}
					{renderTagsField()}
				</Grid>
				<UserRestrictions
					values={restrictionsValues}
					setRestritionsValues={setRestrictionsValues}
					filters={{}}
					clearFilters={() => {}}
					setFilters={(filters: any) => {}}
				/>
				{renderActions()}
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(UserEdit);
