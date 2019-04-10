import React, { FunctionComponent } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { TEMPLATE_CREATE, TEMPLATES } from '../../constants/routes';
import { Page, TemplateChange as TemplateChangeComponent } from '../../components';

const styles = createStyles({
	link: {
		textDecoration: 'none',
	},
});

interface ITask {
	id: string;
	name: string;
	operations: Array<{ id: string; name: string }>;
}

interface ITemplate {
	id: string;
	name: string;
	tasks: ITask[];
}

interface ITemplateCreateProps
	extends RouteComponentProps<{ id: string }>,
		WithStyles<typeof styles> {
	templateCreate: (values: ITemplate) => void;
	templateEdit: (values: ITemplate) => void;
	getTemplate: (id: string) => {};
	setSnackbar: (message: string, type?: string) => void;
	tasks: ITask[];
}

const TemplateChange: FunctionComponent<ITemplateCreateProps> = ({
	templateCreate,
	templateEdit,
	getTemplate,
	tasks,
	classes,
	match,
}) => {
	const isCreatePage: boolean = match.path === TEMPLATE_CREATE;

	const headerTitle: string = isCreatePage ? 'Создание шаблона' : 'Редактирование шаблона';

	const initialValues: ITemplate | {} = isCreatePage ? {} : getTemplate(match.params.id);

	const action: (values: ITemplate) => void = isCreatePage ? templateCreate : templateEdit;

	return (
		<Page
			actions={[
				<Link key="cancel" className={classes.link} to={TEMPLATES}>
					<Button variant="contained" color="primary">
						Отмена
					</Button>
				</Link>,
			]}
			headerTitle={headerTitle}
		>
			<TemplateChangeComponent tasks={tasks} initialValues={initialValues} action={action} />
		</Page>
	);
};

export default withStyles(styles)(TemplateChange);
