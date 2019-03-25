import React from 'react';
import Button from '@material-ui/core/Button';

import { Page } from '../../components';

const Roles = () => (
	<Page
		actions={[
			<Button variant="contained" color="primary" key="new-template">
				Создать новый шаблон
			</Button>,
		]}
		headerTitle="Шаблоны"
	>
		<div>content</div>
	</Page>
);

export default Roles;
