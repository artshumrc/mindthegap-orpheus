import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Projects
import ProjectLayout from '../../projects/layouts/ProjectLayout';
import ProfileContainer from '../containers/ProfileContainer';
import ProfileProjectsContainer from '../containers/ProfileProjectsContainer';

export default (
	<div>
		<Route path="/profile" component={ProjectLayout}>
			<IndexRoute component={ProfileContainer} />
			<Route path="/profile/projects" component={ProfileProjectsContainer} />
		</Route>
		<Route path="/users/:id" component={ProfileContainer} />
	</div>
);
