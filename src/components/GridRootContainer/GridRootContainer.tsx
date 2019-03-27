import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

const styles = createStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		width: '100%',
	},
});

interface IGridContainerProps extends WithStyles<typeof styles> {}

const GridRootContainer: FC<IGridContainerProps> = ({ classes, ...rest }) => (
	<div className={classes.container} {...rest} />
);

export default withStyles(styles)(GridRootContainer);
