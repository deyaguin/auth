import React, { FC, useEffect, useState, ReactNode, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { USERS } from '../../constants/routes';
import { Page, UserTemplates } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
		button: {
			minWidth: 260,
		},
		container: {
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

	const [loginValue, setLoginValue]: [string, (loginValue: string) => void] = useState('');

	const [loginFieldTouched, setLoginFieldTouched]: [
		boolean,
		(loginValueTouched: boolean) => void
	] = useState(false);

	const [selectedTemplates, setSelectedTemplates]: [
		string[],
		(selectedTempates: string[]) => void
	] = useState([] as string[]);

	const handleSetSelelectedTemplates = (values: any) => {
		setSelectedTemplates(values);
	};

	const handleSetLoginValue = (e: ChangeEvent<HTMLInputElement>): void => {
		setLoginValue(e.currentTarget.value);

		setLoginFieldTouched(true);
	};

	const handleSave = (): void => {
		setLoginFieldTouched(true);

		if (loginValue) {
			console.log({ login: loginValue, templates: selectedTemplates });

			setSnackbar('Пользователь успешно создан', 'success');

			history.replace(USERS);
		}
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
				{renderLoginField()}
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
				/>
				<Grid item={true} container={true} justify="center">
					<Button
						onClick={handleSave}
						className={classes.button}
						variant="outlined"
						color="primary"
					>
						Сохранить
					</Button>
				</Grid>
			</Grid>
		</Page>
	);
};

export default withStyles(styles)(UserCreate);
