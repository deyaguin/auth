import React, { FunctionComponent, ReactElement } from 'react';

interface AppBodyProps {
	children: ReactElement;
	className: string;
}

const AppBody: FunctionComponent<AppBodyProps> = ({ children, ...props }) => (
	<main {...props}>{children}</main>
);

export default AppBody;
