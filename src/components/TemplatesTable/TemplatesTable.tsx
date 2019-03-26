import React, { Fragment, FC, ReactNode } from 'react';
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
import Popper from '../../components/Popper';

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

const TemplatesTable: FC<ITemplatesTableProps> = ({ classes, templates, templateDelete }) => {
	const handleDelete = (id: string) => () => {
		templateDelete(id);
	};

	const renderPopper: (id: string) => ReactNode = (id: string) => (
		<Popper
			onAgree={handleDelete(id)}
			title="Удалить шаблон?"
			agreeText="Удалить"
			cancelText="Отмена"
		>
			{(setButtonRef: (node: any) => void, onClick) => (
				<Tooltip title="Удалить шаблон">
					<IconButton buttonRef={setButtonRef} color="secondary" onClick={onClick}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			)}
		</Popper>
	);

	const renderTemplate: (template: ITemplate) => ReactNode = ({ id, name, comment }: ITemplate) => {
		return (
			<Fragment key={id}>
				<TableRow>
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
						{renderPopper(id)}
					</TableCell>
				</TableRow>
			</Fragment>
		);
	};

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
