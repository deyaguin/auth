import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import ITemplate from '../../stores/Models/Template';
import ITask from '../../stores/Models/Task';
import { Page, TemplateView } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			margin: theme.spacing.unit * 2,
		},
	});

interface ITasks {
	[id: string]: ITask;
}

interface ITemplateProps extends RouteComponentProps<{ id: string }>, WithStyles<typeof styles> {
	getTemplate: (id: string) => ITemplate;
}

const Template: FC<ITemplateProps> = ({ match: { params }, getTemplate, classes }) => {
	const template: ITemplate = getTemplate(params.id);
	const tasks: ITasks = template.tasks
		? template.tasks.reduce((acc: ITasks, item: ITask) => ({ ...acc, [item.id]: item }), {})
		: {};

	return (
		<Page headerTitle={template.name}>
			<TemplateView
				className={classes.container}
				name={template.name}
				tags={template.tags}
				comment={template.comment}
				tasks={tasks}
			/>
		</Page>
	);
};

export default withStyles(styles)(Template);
