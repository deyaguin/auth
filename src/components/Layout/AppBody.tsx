import React, { FunctionComponent, ReactElement } from 'react';

interface IAppBodyProps {
	children: ReactElement;
	className: string;
}

const AppBody: FunctionComponent<IAppBodyProps> = ({ children, ...props }) => (
	<main {...props}>{children}</main>
);

export default AppBody;
