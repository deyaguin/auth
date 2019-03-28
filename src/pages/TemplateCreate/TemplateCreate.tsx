import React, { FunctionComponent } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { Page, TemplateChange } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
		pageContainer: {
			padding: theme.spacing.unit * 3,
		},
	});

interface ITemplateCreateProps extends WithStyles<typeof styles> {
	templateCreate: (values: any) => void;
	tasks: Array<{ id: string; name: string; operations: Array<{ id: string; name: string }> }>;
}

const TemplateCreate: FunctionComponent<ITemplateCreateProps> = ({
	templateCreate,
	tasks,
	classes,
}) => {
	return (
		<Page contentClass={classes.pageContainer} headerTitle="Создание шаблона">
			<TemplateChange tasks={tasks} />
		</Page>
	);
};

export default withStyles(styles)(TemplateCreate);
