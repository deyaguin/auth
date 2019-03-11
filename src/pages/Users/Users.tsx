import React, { FunctionComponent } from 'react';

interface UsersProps {
	users: Array<{ login: string }>;
	loading: boolean;
}

const Users: FunctionComponent<UsersProps> = ({ users, loading }) => (
	<section>
		{console.log(loading)}
		{console.log(users)}
		<button onClick={e => console.log(e)}>test</button>
	</section>
);

export default Users;
