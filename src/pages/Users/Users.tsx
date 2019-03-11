import React, { FunctionComponent } from 'react';

interface UsersProps {
	users: Array<{ login: string }>;
	loading: boolean;
	usersList: () => void;
}

const Users: FunctionComponent<UsersProps> = ({ users, loading, usersList }) => (
	<section>
		{console.log(loading)}
		{console.log(users)}
		<button onClick={usersList}>test</button>
	</section>
);

export default Users;
