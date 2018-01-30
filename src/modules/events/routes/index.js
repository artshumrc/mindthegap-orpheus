import React from 'react';
import { Route, IndexRoute } from 'react-router';


// layouts
import ProjectLayout from '../../projects/layouts/ProjectLayout';

// components
import EventListPageContainer from '../containers/EventListPageContainer';
import EventEditorContainer from '../containers/EventEditorContainer';
import EventDetailContainer from '../containers/EventDetailContainer';

export default (
	<div>
		<Route path="/events" component={ProjectLayout}>
			<IndexRoute component={EventListPageContainer} />
			<Route path="/events/create" component={EventEditorContainer} />
			<Route path="/events/:id/:slug" component={EventDetailContainer} />
			<Route path="/events/:id/:slug/edit" component={EventEditorContainer} />
		</Route>
	</div>
);
