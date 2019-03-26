import React, { FC, MouseEvent } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			margin: `0 ${theme.spacing.unit * 2}px`,
		},
	});

interface ITablePaginationProps extends WithStyles<typeof styles> {
	count: number;
	page: number;
	rowsPerPage: number;
	onChangePage: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
}

const TablePaginationActions: FC<ITablePaginationProps> = ({
	classes,
	count,
	page,
	rowsPerPage,
	onChangePage,
}) => {
	const handleFirst = (e: MouseEvent<HTMLButtonElement>) => {
		onChangePage(e, 0);
	};

	const handleLast = (e: MouseEvent<HTMLButtonElement>) => {
		onChangePage(e, Math.ceil(count / rowsPerPage));
	};

	const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
		onChangePage(e, page + 1);
	};

	const handlePrev = (e: MouseEvent<HTMLButtonElement>) => {
		onChangePage(e, page - 1);
	};

	return (
		<div className={classes.container}>
			<IconButton onClick={handleFirst} disabled={page <= 0}>
				<FirstPageIcon />
			</IconButton>
			<IconButton onClick={handlePrev} disabled={page <= 0}>
				<KeyboardArrowLeftIcon />
			</IconButton>
			<IconButton onClick={handleNext} disabled={page >= Math.ceil(count / rowsPerPage)}>
				<KeyboardArrowRightIcon />
			</IconButton>
			<IconButton onClick={handleLast} disabled={page >= Math.ceil(count / rowsPerPage)}>
				<LastPageIcon />
			</IconButton>
		</div>
	);
};

export default withStyles(styles)(TablePaginationActions);
