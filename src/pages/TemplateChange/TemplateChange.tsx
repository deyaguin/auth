import React, { FunctionComponent } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { TEMPLATE_CREATE, TEMPLATES } from '../../constants/routes';
import { Page, TemplateChange as TemplateChangeComponent } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
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
	templateCreate: (values: any) => void;
	getTemplate: (id: string) => {};
	tasks: ITask[];
}

const TemplateChange: FunctionComponent<ITemplateCreateProps> = ({
	templateCreate,
	getTemplate,
	tasks,
	classes,
	match,
}) => {
	const headerTitle: string =
		match.path === TEMPLATE_CREATE ? 'Создание шаблона' : 'Редактирование шаблона';

	const initialValues: ITemplate | {} =
		match.path !== TEMPLATE_CREATE ? getTemplate(match.params.id) : {};

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
			<TemplateChangeComponent tasks={tasks} initialValues={initialValues} />
		</Page>
	);
};

export default withStyles(styles)(TemplateChange);
