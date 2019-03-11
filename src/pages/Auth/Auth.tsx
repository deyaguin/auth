import React from 'react';
import { observer, inject } from 'mobx-react';

import { AppStore } from '../../stores';

interface IAppStoreProps {
	appStore?: AppStore;
}

const Auth: React.SFC<IAppStoreProps> = ({ appStore }) => {
	if (appStore) {
		appStore.auth();
	}

	return <section>Auth</section>;
};

export default inject('appStore')(observer(Auth));
