import React, { FC } from 'react';
import { reduce, map } from 'ramda';
import { RouteComponentProps } from 'react-router';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { ITemplate, IValues, IOperation } from '../../types';
import { Page, TemplateView } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			margin: theme.spacing.unit * 2,
		},
	});

interface ITemplateProps extends RouteComponentProps<{ id: string }>, WithStyles<typeof styles> {
	getTemplate: (id: string) => ITemplate;
}

const Template: FC<ITemplateProps> = ({ match: { params }, getTemplate, classes }) => {
	const { tasks: tasksValues, ...rest }: ITemplate = getTemplate(params.id);

	const tasks: IValues = reduce(
		(acc: IValues, { id, operations, ...restTask }: IValues) => ({
			...acc,
			[id]: {
				...restTask,
				id,
				operations: map((item: IOperation) => ({ ...item, selected: true }), operations),
			},
		}),
		{},
		tasksValues,
	);

	return (
		<Page headerTitle={rest.name}>
			<TemplateView {...rest} className={classes.container} tasks={tasks} />
		</Page>
	);
};

export default withStyles(styles)(Template);
