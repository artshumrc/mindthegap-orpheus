import React from 'react';
import { Route, IndexRoute } from 'react-router';


// layouts
import ProjectLayout from '../../projects/layouts/ProjectLayout';

// components
// items
import AuthContainer from '../containers/AuthContainer';
import LogoutContainer from '../containers/LogoutContainer';


export default (
	<div>
		<Route path="/auth" component={ProjectLayout}>
			<IndexRoute component={AuthContainer} />
			<Route path="logout" component={LogoutContainer} />
		</Route>
	</div>
);
