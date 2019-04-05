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
	denied: 'Запрещено',
};

const CONDITIONS: { [name: string]: string } = {
	equal: '=',
	less: '<',
	less_or_equal: '<=',
	more: '>',
	more_or_equal: '>=',
	not_equal: '!=',
};

export {
	DRAWER_WIDTH,
	TABLE_PAGE_SIZES,
	FILTER_MESSAGES,
	TABLE_MESSAGES,
	TABLE_ACTIONS_WIDTH,
	OPERATION_STATES,
	CONDITIONS,
};
