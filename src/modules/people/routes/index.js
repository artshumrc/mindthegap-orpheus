import React from 'react';
import { Route, IndexRoute } from 'react-router';


// layouts
import ProjectLayout from '../../projects/layouts/ProjectLayout';

// components
import PersonEditorContainer from '../containers/PersonEditorContainer';
import PersonListPageContainer from '../containers/PersonListPageContainer';
import PersonDetailContainer from '../containers/PersonDetailContainer';


export default (
	<div>
		<Route path="/people" component={ProjectLayout}>
			<IndexRoute component={PersonListPageContainer} />
			<Route path="/people/create" component={PersonEditorContainer} />
			<Route path="/people/:id/:slug" component={PersonDetailContainer} />
			<Route path="/people/:id/:slug/edit" component={PersonEditorContainer} />
		</Route>
	</div>
);
