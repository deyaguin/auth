import createMuiTheme, { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const defaultOptions: ThemeOptions = {};

export default (options: ThemeOptions) =>
	createMuiTheme({
		...defaultOptions,
		...options,
	});
