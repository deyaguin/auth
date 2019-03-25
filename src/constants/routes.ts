const AUTH = '/auth';
const USERS = '/users';
const TEMPLATES = '/templates';
const TEMPLATE_CREATE = `${TEMPLATES}/create`;
const USER_CREATE = `${USERS}/create`;
const TEMPLATE = `${TEMPLATES}/:id(\\d+)`;
const USER = `${USERS}/:id`;

export { AUTH, USERS, TEMPLATES, TEMPLATE_CREATE, USER_CREATE, TEMPLATE, USER };
