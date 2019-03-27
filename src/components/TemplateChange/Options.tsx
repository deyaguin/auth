import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = createStyles({
	container: {
		display: 'flex',
	},
});

interface IOprionsProps extends WithStyles<typeof styles> {}

const Options: FC<IOprionsProps> = () => <div>options</div>;

export default withStyles(styles)(Options);
