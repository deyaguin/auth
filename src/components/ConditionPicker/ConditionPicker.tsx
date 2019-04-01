import React, { FC } from 'react';
import TextField from '@material-ui/core/TextField';

interface IConditionPickerProps {}

const ConditionPicker: FC<IConditionPickerProps> = () => (
	<TextField select={true} fullWidth={true} value="=" />
);

export default ConditionPicker;
