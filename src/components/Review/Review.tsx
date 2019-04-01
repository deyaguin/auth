import React, { FC, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = createStyles({
	container: {
		display: 'flex',
	},
});

interface IReviewProps extends WithStyles<typeof styles> {}

const Review: FC<IReviewProps> = () => {
	return <div>review</div>;
};

export default withStyles(styles)(Review);
