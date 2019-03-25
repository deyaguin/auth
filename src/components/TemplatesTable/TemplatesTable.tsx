import React, { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Tooltip from '@material-ui/core/Tooltip';

import { TEMPLATES } from '../../constants/routes';

const styles = createStyles({
	actions: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
});

interface ITemplate {
	id: string;
	name: string;
	comment: string;
}

interface ITemplatesTableProps extends WithStyles<typeof styles> {
	templates: ITemplate[];
	templateDelete: (id: string) => void;
}

const TemplatesTable: FunctionComponent<ITemplatesTableProps> = ({
	classes,
	templates,
	templateDelete,
}) => {
	const handleDelete = (id: string) => () => templateDelete(id);

	const renderTemplate: (template: ITemplate) => ReactNode = ({ id, name, comment }: ITemplate) => (
		<TableRow key={id}>
			<TableCell>{name}</TableCell>
			<TableCell>{comment}</TableCell>
			<TableCell className={classes.actions}>
				<Tooltip title="Открыть карточку шаблона">
					<Link to={`${TEMPLATES}/${id}`}>
						<IconButton color="primary">
							<OpenInNewIcon />
						</IconButton>
					</Link>
				</Tooltip>
				<Tooltip title="Удалить шаблон">
					<IconButton color="secondary" onClick={handleDelete(id)}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</TableCell>
		</TableRow>
	);

	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Название</TableCell>
					<TableCell>Комментарий</TableCell>
					<TableCell />
				</TableRow>
			</TableHead>
			<TableBody>{templates.map(renderTemplate)}</TableBody>
		</Table>
	);
};

TemplatesTable.defaultProps = {
	templates: [],
};

export default withStyles(styles)(TemplatesTable);
