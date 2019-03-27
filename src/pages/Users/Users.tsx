import React, { FC } from 'react';

interface IUsersProps {
	users: Array<{ login: string }>;
	loading: boolean;
	usersList: () => void;
}

const Users: FC<IUsersProps> = ({ users, loading, usersList }) => (
	<section>
		{console.log(loading)}
		{console.log(users)}
		<button onClick={usersList}>test</button>
	</section>
);

export default Users;
