import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { USERS } from '../../constants/routes';
import { Page, UserChange as UserChangeComponent } from '../../components';

const styles = createStyles({
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
	console.log(match);
	const headerTitle: string = 'Добавление пользователя';

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
			<UserChangeComponent
				templates={templates}
				filters={filters}
				setFilters={setFilters}
				clearFilters={clearFilters}
			/>
		</Page>
	);
};

export default withStyles(styles)(UserChange);
