import React, { useState } from 'react';

type SetValue = (key: string, value: any) => void;

type SetError = (key: string, value: boolean) => void;

const withForm = (Children: any) => (props: any) => {
	const [values, setValues]: [{ [name: string]: any }, (value: any) => void] = useState(
		props.initialValues || {},
	);

	const [errors, setErrors]: [
		{ [name: string]: boolean },
		(error: { [name: string]: boolean }) => void
	] = useState({});

	const handleSetError: SetError = (key, value) => {
		setErrors({ ...errors, [key]: value });
	};

	const handleSetValue: SetValue = (key, value) => {
		setValues({ ...values, [key]: value });

		handleSetError(key, false);
	};

	return (
		<Children
			{...props}
			setValue={handleSetValue}
			setError={handleSetError}
			errors={errors}
			values={values}
		/>
	);
};

export default withForm;
