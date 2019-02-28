import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
	container: {
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
		position: 'relative',
	},
	progressContainer: {
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.02)',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		position: 'absolute',
		width: '100%',
	},
});

const withProgress = (Children: any) =>
	withStyles(styles)(({ classes, ...props }: any) => {
		const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState(false);

		return (
			<section className={classes.container}>
				{loading && (
					<div className={classes.progressContainer}>
						<CircularProgress />
					</div>
				)}
				<Children {...props} setLoading={setLoading} />
			</section>
		);
	});

export default withProgress;
