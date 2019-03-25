import React, { FunctionComponent } from 'react';
import Button from '@material-ui/core/Button';

import { Page, Table } from '../../components';

interface ITemplateProps {
	loading: boolean;
	templates: Array<{}>;
}

const tableHead = [
	{ key: 'name', children: 'Шаблон' },
	{ key: 'comment', children: 'Комментарий' },
	{ key: 'action', children: '' },
];

const Templates: FunctionComponent<ITemplateProps> = ({ loading, templates }) => (
	<Page
		actions={[
			<Button variant="contained" color="primary" key="new-template">
				Создать новый шаблон
			</Button>,
		]}
		headerTitle="Шаблоны"
	>
		<Table head={tableHead} data={templates} />
	</Page>
);

export default Templates;
