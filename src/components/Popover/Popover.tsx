import React, { Component, Fragment, ReactNode } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import BasePopover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';

const styles = (theme: Theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexDirection: 'column',
			padding: theme.spacing.unit,
		},
		title: {
			marginBottom: theme.spacing.unit * 2,
			marginTop: theme.spacing.unit,
		},
	});

interface IPopperProps extends WithStyles<typeof styles> {
	onAgree: () => void;
	onCancel?: () => void;
	title: string;
	content?: string;
	agreeText: string;
	cancelText: string;
	children: (setButtonRef: (node: any) => void, onClick: () => void) => ReactNode;
}

class Popper extends Component<IPopperProps, { open: boolean }> {
	private buttonRef: any;

	constructor(props: IPopperProps) {
		super(props);

		this.buttonRef = React.createRef();
		this.state = { open: false };
	}

	public render() {
		const { title, content, agreeText, cancelText, children, classes } = this.props;
		const { open } = this.state;

		return (
			<Fragment>
				{children((node: any) => (this.buttonRef = node), this.onOpen)}
				<BasePopover open={open} anchorEl={this.buttonRef} onClose={this.onClose}>
					<Zoom in={open}>
						<Paper className={classes.container}>
							<Typography align="center" className={classes.title} variant="subheading">
								{title}
							</Typography>
							{content && content /* todo */}
							<Grid container={true} justify="center" spacing={8}>
								<Grid item={true}>
									<Button color="secondary" onClick={this.handleAgree}>
										{agreeText}
									</Button>
								</Grid>
								<Grid item={true}>
									<Button color="primary" onClick={this.handleCancel}>
										{cancelText}
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Zoom>
				</BasePopover>
			</Fragment>
		);
	}

	private onClose = (): void => {
		this.setState({ open: false });
	};

	private onOpen = (): void => {
		this.setState({ open: true });
	};

	private handleAgree = (): void => {
		const { onAgree } = this.props;

		onAgree();

		this.onClose();
	};

	private handleCancel = (): void => {
		const { onCancel } = this.props;

		if (onCancel) {
			onCancel();
		}

		this.onClose();
	};
}

export default withStyles(styles)(Popper);
