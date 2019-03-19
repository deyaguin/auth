const AUTHORIZATION_BASE_URL = process.env.REACT_APP_AUTHORIZATION_BASE_URL;

const AUTHORIZATION_ROLES_LIST = 'role';

const AUTHORIZATION_ROLE_CREATE = 'role';

const AUTHORIZATION_ROLE_DELETE = (name: string) => `user/${name}`;

const AUTHORIZATION_REGISTRY_LIST = 'registry';

const AUTHORIZATION_REGISTRY_CREATE = 'registry';

const AUTHORIZATION_REGISTRY_DELETE = (id: number) => `registry/${id}`;

export {
	AUTHORIZATION_BASE_URL,
	AUTHORIZATION_ROLES_LIST,
	AUTHORIZATION_ROLE_CREATE,
	AUTHORIZATION_ROLE_DELETE,
	AUTHORIZATION_REGISTRY_LIST,
	AUTHORIZATION_REGISTRY_CREATE,
	AUTHORIZATION_REGISTRY_DELETE,
};