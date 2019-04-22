import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router';

import { ASSIGN_TEMPLATES } from '../../constants/routes';
import { Page, RestrictionsTable } from '../../components';

const styles = (theme: Theme) =>
	createStyles({
		link: {
			textDecoration: 'none',
		},
	});

interface IConflictResolutionProps extends WithStyles<typeof styles>, RouteComponentProps {}

const ConflictResolution: FC<IConflictResolutionProps> = ({ classes }) => {
	return (
		<Page
			actions={[
				<Link key="cancel" className={classes.link} to={ASSIGN_TEMPLATES}>
					<Button variant="contained" color="primary">
						Закрыть
					</Button>
				</Link>,
			]}
			headerTitle="Предварительный результат"
		>
			test
		</Page>
	);
};

export default withStyles(styles)(ConflictResolution);
