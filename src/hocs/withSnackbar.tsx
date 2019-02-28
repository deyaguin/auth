import React, { Fragment, FunctionComponent } from 'react';

import { AppSnackbar } from '../components';

interface SnackbarOptions {
	open: boolean;
	message: string;
	type: string;
	onClose: () => void;
	onAction: () => void;
}

interface WithSnackbarProps {
	snackbarOptions?: SnackbarOptions;
}

const withSnackbar = (Children: any): FunctionComponent<WithSnackbarProps> => ({
	snackbarOptions,
	...props
}) => (
	<Fragment>
		<Children {...props} />
		<AppSnackbar {...snackbarOptions} />
	</Fragment>
);

export default withSnackbar;
