import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { TEMPLATE_CREATE } from '../../constants/routes';
import { Page, TemplatesTable } from '../../components';

const styles = createStyles({
	link: {
		textDecoration: 'none',
	},
});

interface ITemplateProps extends WithStyles<typeof styles> {
	loading: boolean;
	templates: Array<{ id: string; name: string; comment: string }>;
	templateDelete: (id: string) => void;
}

const Templates: FunctionComponent<ITemplateProps> = ({
	classes,
	loading,
	templates,
	templateDelete,
}) => (
	<Page
		actions={[
			<Link key="new-template" className={classes.link} to={TEMPLATE_CREATE}>
				<Button variant="contained" color="primary">
					Создать новый шаблон
				</Button>
			</Link>,
		]}
		headerTitle="Шаблоны"
	>
		<TemplatesTable templates={templates} templateDelete={templateDelete} />
	</Page>
);

export default withStyles(styles)(Templates);
