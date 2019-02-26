const AUTHENTICATION_BASE_URL = process.env.REACT_APP_AUTHENTICATION_BASE_URL;

const AUTHENTICATION_USERS_LIST = 'user';

const AUTHENTICATION_USER_CREATE = 'user/create';

const AUTHENTICATION_USER_DELETE = (id: number) => `user/${id}`;

const AUTHENTICATION_USER_EDIT = (id: number) => `user/${id}`;

export {
	AUTHENTICATION_BASE_URL,
	AUTHENTICATION_USERS_LIST,
	AUTHENTICATION_USER_CREATE,
	AUTHENTICATION_USER_EDIT,
	AUTHENTICATION_USER_DELETE,
};
