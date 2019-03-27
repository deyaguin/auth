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
}

const TemplateCreate: FunctionComponent<ITemplateCreateProps> = ({ templateCreate, classes }) => {
	return (
		<Page contentClass={classes.pageContainer} headerTitle="Создание шаблона">
			<TemplateChange />
		</Page>
	);
};

export default withStyles(styles)(TemplateCreate);
