import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';

interface ITemplateProps extends RouteComponentProps {
	template: {
		id: string;
		name: string;
		comment: string;
	};
}

const Template: FunctionComponent<ITemplateProps> = props => {
	return <div>template{console.log(props)}</div>;
};

export default Template;
