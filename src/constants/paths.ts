const BASE_URL = process.env.REACT_APP_API;

const AUTH = 'auth';

const USERS_LIST = 'user';

const USER_CREATE = 'user/create';

const USER_DELETE = (id: number) => `user/${id}`;

const USER_EDIT = (id: number) => `user/${id}`;

const ROLES_LIST = 'role';

const ROLE_CREATE = 'role';

const ROLE_DELETE = (name: string) => `user/${name}`;

const REGISTRY_LIST = 'registry';

const REGISTRY_CREATE = 'registry';

const REGISTRY_DELETE = (id: number) => `registry/${id}`;

export {
	BASE_URL,
	AUTH,
	USERS_LIST,
	USER_CREATE,
	USER_DELETE,
	USER_EDIT,
	ROLES_LIST,
	ROLE_DELETE,
	ROLE_CREATE,
	REGISTRY_LIST,
	REGISTRY_CREATE,
	REGISTRY_DELETE,
};
