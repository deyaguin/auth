import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles({
	container: {},
});

interface IRestrictionsTableProps extends WithStyles<typeof styles> {}

const RestrictionsTable: FC<IRestrictionsTableProps> = ({ classes }) => (
	<div className={classes.container}>RestrictionsTable</div>
);

export default withStyles(styles)(RestrictionsTable);
