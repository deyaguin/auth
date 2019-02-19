import React from 'react';
import { observer, inject } from 'mobx-react';

import { AppStore } from '../../stores';

interface AppStoreProps {
	appStore?: AppStore;
}

const Auth: React.SFC<AppStoreProps> = ({ appStore }) => {
	if (appStore) {
		appStore.auth();
	}

	return <section>Auth</section>;
};

export default inject('appStore')(observer(Auth));
