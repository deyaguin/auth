const DRAWER_WIDTH = 240;

const TABLE_ACTIONS_WIDTH = 200;

const TABLE_PAGE_SIZES = [5, 10, 20];

const FILTER_MESSAGES = {
	filterPlaceholder: 'Фильтр',
};

const TABLE_MESSAGES = {
	noData: 'Нет данных',
};

const OPERATION_STATES: { [name: string]: string } = {
	allowed: 'Разрешено',
	banned: 'Запрещено',
	not_set: 'Не задано',
};

export {
	DRAWER_WIDTH,
	TABLE_PAGE_SIZES,
	FILTER_MESSAGES,
	TABLE_MESSAGES,
	TABLE_ACTIONS_WIDTH,
	OPERATION_STATES,
};
