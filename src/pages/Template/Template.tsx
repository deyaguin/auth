import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router';

import { Page } from '../../components';

interface ITemplateProps extends RouteComponentProps {
	template: {
		id: string;
		name: string;
		comment: string;
	};
}

const Template: FC<ITemplateProps> = props => {
	return <Page headerTitle="Шаблон">{'content'}</Page>;
};

export default Template;
