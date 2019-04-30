import React, { FC, ReactNode, ChangeEvent } from 'react';
import { map, keys, compose } from 'ramda';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface IStatePickerProps {
	className?: string;
	onChange: (value: string) => void;
	value: string;
	optionValues: { [name: string]: string };
	textFieldProps?: TextFieldProps;
}

const ValuePicker: FC<IStatePickerProps> = ({
	className,
	value,
	onChange,
	optionValues,
	textFieldProps,
}) => {
	const handleSetValue = (e: ChangeEvent<HTMLSelectElement>) => onChange(e.currentTarget.value);

	const getOptions = compose(
		map<string, ReactNode>((key: string) => (
			<option key={key} value={key}>
				{optionValues[key]}
			</option>
		)),
		keys,
	);

	return (
		<TextField
			{...textFieldProps}
			className={className}
			onChange={handleSetValue}
			select={true}
			value={value}
			fullWidth={true}
			SelectProps={{ native: true }}
		>
			{getOptions(optionValues)}
		</TextField>
	);
};

export default ValuePicker;
