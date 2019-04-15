const AUTH = '/auth';
const USERS = '/users';
const TEMPLATES = '/templates';
const TEMPLATE_CREATE = `${TEMPLATES}/create`;
const TEMPLATE_EDIT = `${TEMPLATES}/edit/:id(\\d+)`;
const USER_CREATE = `${USERS}/create`;
const USER_EDIT = `${USERS}/edit/:id(\\d+)`;
const TEMPLATE = `${TEMPLATES}/:id(\\d+)`;
const USER = `${USERS}/:id`;
const RESTRICTIONS_EDITOR = '/restrictions_editor';

export {
	AUTH,
	USERS,
	TEMPLATES,
	TEMPLATE_CREATE,
	USER_CREATE,
	TEMPLATE_EDIT,
	USER_EDIT,
	TEMPLATE,
	USER,
	RESTRICTIONS_EDITOR,
};
