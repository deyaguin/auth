import React from 'react';
import Button from '@material-ui/core/Button';

import { Page, Table } from '../../components';

const tableHead = [
	{ key: 'template', children: 'Шаблон' },
	{ key: 'comment', children: 'Комментарий' },
	{ key: 'action', children: '' },
];

const Roles = () => (
	<Page
		actions={[
			<Button variant="contained" color="primary" key="new-template">
				Создать новый шаблон
			</Button>,
		]}
		headerTitle="Шаблоны"
	>
		<Table head={tableHead} />
	</Page>
);

export default Roles;
