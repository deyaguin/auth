import React, { FC, ReactNode } from 'react';
import TextField from '@material-ui/core/TextField';

import { OPERATION_STATES } from '../../constants/ui';
import { SetValue } from '../types';

interface IStatePickerProps {
	setValue: SetValue;
	value: OPERATION_STATES;
}

const StatePicker: FC<IStatePickerProps> = ({ value, setValue }) => {
	const handleSetValue = (e: any) => {};

	const renderOptions = (): ReactNode[] => {
		const options: ReactNode[] = [];

		for (const key in OPERATION_STATES) {
			if (key) {
				options.push(<option key={key}>{OPERATION_STATES[key]}</option>);
			}
		}

		return options;
	};

	return (
		<TextField
			onChange={handleSetValue}
			select={true}
			value={value}
			fullWidth={true}
			SelectProps={{ native: true }}
		>
			{renderOptions()}
		</TextField>
	);
};

export default StatePicker;
