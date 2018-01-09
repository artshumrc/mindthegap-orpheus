import React from 'react';
import { Route, IndexRoute } from 'react-router';


// layouts
import ProjectLayout from '../../projects/layouts/ProjectLayout';

// components
import ItemEditorContainer from '../containers/ItemEditorContainer';
import ItemListPageContainer from '../containers/ItemListPageContainer';
import ItemDetailContainer from '../containers/ItemDetailContainer';
import MiradorItemViewerContainer from '../../mirador/containers/MiradorItemViewerContainer';


import PeopleListPageContainer from '../containers/PeopleListPageContainer';
import EventListPageContainer from '../containers/EventListPageContainer';
import InterviewListPageContainer from '../containers/InterviewListPageContainer';

export default (
	<div>
		<Route path="/items" component={ProjectLayout}>
			<IndexRoute component={ItemListPageContainer} />
			<Route path="/items/create" component={ItemEditorContainer} />
			<Route path="/items/:id/:slug" component={ItemDetailContainer} />
			<Route path="/items/:id/:slug/edit" component={ItemEditorContainer} />
			<Route path="/items/:id/:slug/mirador" component={MiradorItemViewerContainer} />
		</Route>
		<Route path="/people" component={ProjectLayout}>
			<IndexRoute component={PeopleListPageContainer} />
		</Route>
		<Route path="/events" component={ProjectLayout}>
			<IndexRoute component={EventListPageContainer} />
		</Route>
		<Route path="/interviews" component={ProjectLayout}>
			<IndexRoute component={InterviewListPageContainer} />
		</Route>
	</div>
);
