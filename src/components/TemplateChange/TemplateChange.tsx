import React, { FC, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import Options from './Options';
import Tasks from './Tasks';
import RestrictionsTable from './RestrictionsTable';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			'& > div:nth-child(n + 2)': { marginTop: theme.spacing.unit * 3 },
			display: 'flex',
			flexDirection: 'column',
		},
	});

interface ITemplateChangeProps extends WithStyles<typeof styles> {}

const TemplateChange: FC<ITemplateChangeProps> = ({ classes }) => {
	const [name, setName]: [string, (name: string) => void] = useState('');
	const [tags, setTags] = useState([]);

	return (
		<div className={classes.container}>
			<Options />
			<Tasks />
			<RestrictionsTable />
		</div>
	);
};

export default withStyles(styles)(TemplateChange);
