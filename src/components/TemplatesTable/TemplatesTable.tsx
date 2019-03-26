import React, { Fragment, FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import Tooltip from '@material-ui/core/Tooltip';

import { TEMPLATES } from '../../constants/routes';
import { TablePagination, Popper } from '../../components';

const styles = createStyles({
	actions: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'flex-end',
	},
	actionsCell: {
		width: 200,
	},
	commentCell: {
		width: 300,
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		justifyContent: 'space-between',
	},
	headerActionsCell: {
		width: 216,
	},
	nameCell: {
		width: 200,
	},
	tableScrollWrapper: {
		height: '100%',
		overflowY: 'scroll',
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
	limit: number;
	offset: number;
	total: number;
	setLimit: (limit: number) => void;
	setOffset: (offset: number) => void;
}

const TemplatesTable: FC<ITemplatesTableProps> = ({
	classes,
	templates,
	templateDelete,
	setLimit,
	setOffset,
	limit,
	offset,
	total,
}) => {
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

	const renderTableHeader: () => ReactNode = () => (
		<TableHead component="div">
			<TableRow component="div">
				<TableCell className={classes.nameCell} component="div">
					Название
				</TableCell>
				<TableCell className={classes.commentCell} component="div">
					Комментарий
				</TableCell>
				<TableCell className={classes.headerActionsCell} component="div" />
			</TableRow>
		</TableHead>
	);

	const renderTableFooter: () => ReactNode = () => (
		<TableFooter component="div">
			<TableRow component="div">
				<TablePagination
					setLimit={setLimit}
					setOffset={setOffset}
					limit={limit}
					offset={offset}
					total={total}
				/>
			</TableRow>
		</TableFooter>
	);

	const renderTemplate: (template: ITemplate) => ReactNode = ({ id, name, comment }: ITemplate) => {
		return (
			<Fragment key={id}>
				<TableRow component="div">
					<TableCell className={classes.nameCell} component="div">
						{name}
					</TableCell>
					<TableCell className={classes.commentCell} component="div">
						{comment}
					</TableCell>
					<TableCell component="div" className={classes.actionsCell}>
						<div className={classes.actions}>
							<Tooltip title="Открыть карточку шаблона">
								<Link to={`${TEMPLATES}/${id}`}>
									<IconButton color="primary">
										<OpenInNewIcon />
									</IconButton>
								</Link>
							</Tooltip>
							{renderPopper(id)}
						</div>
					</TableCell>
				</TableRow>
			</Fragment>
		);
	};

	const renderTableBody: () => ReactNode = () => (
		<TableBody component="div">{templates.map(renderTemplate)}</TableBody>
	);

	return (
		<div className={classes.container}>
			<Table component="div">{renderTableHeader()}</Table>
			<div className={classes.tableScrollWrapper}>
				<Table component="div">{renderTableBody()}</Table>
			</div>
			<Table component="div">{renderTableFooter()}</Table>
		</div>
	);
};

TemplatesTable.defaultProps = {
	templates: [],
};

export default withStyles(styles)(TemplatesTable);
