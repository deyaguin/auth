import React, { FC, ChangeEvent, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { IFilters } from '../types';

const styles = (theme: Theme) =>
	createStyles({
		badge: {
			paddingRight: `${theme.spacing.unit * 2}px !important`,
		},
		root: {
			width: '100%',
		},
	});

interface ITemplatesFilterProps extends WithStyles<typeof styles> {
	filters: IFilters;
	setFilters: (filters: IFilters) => void;
	clearFilters: () => void;
}

const TemplatesFilter: FC<ITemplatesFilterProps> = ({
	classes,
	filters,
	setFilters,
	clearFilters,
}) => {
	const [expanded, setExpanded]: [boolean, (expanded: boolean) => void] = useState(false);
	const [filtersState, setFiltersState]: [IFilters, (filtersState: IFilters) => void] = useState(
		filters,
	);

	const filtersLength: number = Object.keys(filters).length;

	const handleSetExpanded = (): void => setExpanded(!expanded);

	const handleSetFiltersState = (filterName: string) => (e: ChangeEvent<HTMLInputElement>): void =>
		setFiltersState({ ...filtersState, [filterName]: e.currentTarget.value });

	const handleSetFilter = (): void => {
		setFilters(filtersState);
	};

	const handleClearFilter = (): void => {
		clearFilters();

		setFiltersState({});
	};

	return (
		<div className={classes.root}>
			<ExpansionPanel expanded={expanded} onChange={handleSetExpanded}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Badge
						className={classes.badge}
						badgeContent={!expanded ? filtersLength : 0}
						color="primary"
					>
						<Typography variant="subheading">Фильтрация</Typography>
					</Badge>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container={true} spacing={32}>
						<Grid item={true}>
							<TextField
								value={filtersState.name || ''}
								onChange={handleSetFiltersState('name')}
								label="Название"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item={true}>
							<TextField
								value={filtersState.comment || ''}
								onChange={handleSetFiltersState('comment')}
								label="Комментарий"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
					</Grid>
				</ExpansionPanelDetails>
				<ExpansionPanelActions>
					<Grid container={true} justify="flex-end">
						<Button onClick={handleSetFilter} color="primary">
							Применить
						</Button>
						<Button onClick={handleClearFilter} color="secondary">
							Сбросить
						</Button>
					</Grid>
				</ExpansionPanelActions>
			</ExpansionPanel>
		</div>
	);
};

export default withStyles(styles)(TemplatesFilter);
