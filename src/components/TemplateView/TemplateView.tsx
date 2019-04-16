import React, { FC } from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { ITasks } from '../../types';
import RestrictionsTable from '../RestrictionsTable';
import RestrictionsFilter from '../RestrictionsFilter';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			flexGrow: 1,
			padding: `0 ${theme.spacing.unit * 3}`,
		},
		tableWrapper: {
			flexGrow: 1,
		},
	});

interface ITemplateViewProps extends WithStyles<typeof styles> {
	name: string;
	tags?: string;
	comment?: string;
	tasks: ITasks;
	className?: string;
}

const TemplateView: FC<ITemplateViewProps> = ({
	classes,
	name,
	tags,
	comment,
	tasks,
	className,
}) => (
	<Grid
		className={classNames(classes.container, className)}
		direction="column"
		wrap="nowrap"
		container={true}
		item={true}
		spacing={16}
	>
		<Grid container={true} item={true} spacing={24}>
			<Grid item={true}>
				<Grid item={true}>
					<Typography variant="subheading">Название:</Typography>
				</Grid>
				<Grid item={true}>
					<Typography variant="subheading">Теги:</Typography>
				</Grid>
				<Grid item={true}>
					<Typography variant="subheading">Комментарий: </Typography>
				</Grid>
			</Grid>
			<Grid item={true}>
				<Grid item={true}>
					<Typography variant="subheading">{name}</Typography>
				</Grid>
				<Grid item={true}>
					<Typography variant="subheading">{tags}</Typography>
				</Grid>
				<Grid item={true}>
					<Typography variant="subheading">{comment}</Typography>
				</Grid>
			</Grid>
		</Grid>
		<Grid item={true}>
			<RestrictionsFilter filters={{}} setFilters={(filters: any) => {}} clearFilters={() => {}} />
		</Grid>
		<Grid className={classes.tableWrapper} container={true} item={true}>
			<RestrictionsTable editable={false} tasks={tasks} />
		</Grid>
	</Grid>
);

export default withStyles(styles)(TemplateView);
