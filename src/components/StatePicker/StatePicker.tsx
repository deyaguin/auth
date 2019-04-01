import React, { FC, ReactNode } from 'react';
import TextField from '@material-ui/core/TextField';

import { OPERATION_STATES } from '../../constants/ui';

interface IStatePickerProps {
	onChange: (value: string) => void;
	value: string;
}

const StatePicker: FC<IStatePickerProps> = ({ value, onChange }) => {
	const handleSetValue = (e: any) => {
		onChange(e.currentTarget.value);
	};

	const options: ReactNode[] = Object.keys(OPERATION_STATES).map((key: string) => (
		<option key={key} value={key}>
			{OPERATION_STATES[key]}
		</option>
	));

	return (
		<TextField
			onChange={handleSetValue}
			select={true}
			value={value}
			fullWidth={true}
			SelectProps={{ native: true }}
		>
			{options}
		</TextField>
	);
};

export default StatePicker;
