import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';

import { Page, UserChange as UserChangeComponent } from '../../components';

interface IUserChangeProps extends RouteComponentProps {}

const UserChange: FC<IUserChangeProps> = ({ match }) => {
	console.log(match);
	const headerTitle: string = 'Добавление пользователя';

	return (
		<Page headerTitle={headerTitle}>
			<UserChangeComponent />
		</Page>
	);
};

export default UserChange;
