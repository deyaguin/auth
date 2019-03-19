import React, { Fragment, FunctionComponent } from 'react';

import { AppSnackbar } from '../components';

interface ISnackbarOptions {
	open: boolean;
	message: string;
	type: string;
	onClose: () => void;
	onAction: () => void;
}

interface IWithSnackbarProps {
	snackbarOptions?: ISnackbarOptions;
	[name: string]: any;
}

const withSnackbar = (Children: any): FunctionComponent<IWithSnackbarProps> => ({
	snackbarOptions,
	...props
}) => (
	<Fragment>
		<Children {...props} />
		<AppSnackbar {...snackbarOptions} />
	</Fragment>
);

export default withSnackbar;
