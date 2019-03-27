import React, { FC, ReactElement } from 'react';

interface IAppBodyProps {
	children: ReactElement;
	className: string;
}

const AppBody: FC<IAppBodyProps> = ({ children, ...props }) => <main {...props}>{children}</main>;

export default AppBody;
