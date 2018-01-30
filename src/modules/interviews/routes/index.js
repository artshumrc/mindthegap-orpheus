import React from 'react';
import { Route, IndexRoute } from 'react-router';


// layouts
import ProjectLayout from '../../projects/layouts/ProjectLayout';

// components
import InterviewListPageContainer from '../containers/InterviewListPageContainer';
import InterviewEditorContainer from '../containers/InterviewEditorContainer';
import InterviewDetailContainer from '../containers/InterviewDetailContainer';


export default (
	<div>
		<Route path="/interviews" component={ProjectLayout}>
			<IndexRoute component={InterviewListPageContainer} />
			<Route path="/interviews/create" component={InterviewEditorContainer} />
			<Route path="/interviews/:id/:slug" component={InterviewDetailContainer} />
			<Route path="/interviews/:id/:slug/edit" component={InterviewEditorContainer} />
		</Route>
	</div>
);
