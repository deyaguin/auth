import React, { FunctionComponent } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { ITask, IValues, TemplateCreate, TemplateEdit, ITemplate, IOperation } from '../../types';
import { TEMPLATE_CREATE, TEMPLATES } from '../../constants/routes';
import { Page, TemplateChange as TemplateChangeComponent } from '../../components';

const styles = createStyles({
	link: {
		textDecoration: 'none',
	},
});

interface ITemplateCreateProps
	extends RouteComponentProps<{ id: string }>,
		WithStyles<typeof styles> {
	templateCreate: TemplateCreate;
	templateEdit: TemplateEdit;
	getTemplate: (id: string) => ITemplate;
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

	let initialValues: IValues = { name: '', tags: '', comment: '', tasks: [] };

	if (!isCreatePage) {
		const { tasks: tasksValues, ...rest }: ITemplate = getTemplate(match.params.id);

		initialValues = {
			...rest,
			tasks: tasksValues.reduce(
				(acc: IValues, { id, operations, ...restTask }: IValues) => ({
					...acc,
					[id]: {
						...restTask,
						id,
						operations: operations.map((item: IOperation) => ({ ...item, selected: true })),
					},
				}),
				{} as IValues,
			),
		};
	}

	const action: TemplateCreate | TemplateEdit = isCreatePage ? templateCreate : templateEdit;

	return (
		<Page
			actions={[
				<Link key="cancel" className={classes.link} to={TEMPLATES}>
					<Button variant="contained" color="primary">
						Закрыть
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
