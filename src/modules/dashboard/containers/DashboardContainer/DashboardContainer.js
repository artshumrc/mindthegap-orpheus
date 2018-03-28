import React from 'react';
import { compose } from 'react-apollo';

import countsQuery from '../../graphql/queries/counts';
import Dashboard from '../../components/Dashboard';


const DashboardContainer = props => {
	let interviewsCount = 0;
	let eventsCount = 0;
	let itemsCount = 0;
	let peopleCount = 0;

	if (
			props.countsQuery
		&& props.countsQuery.project
	) {
		const project = props.countsQuery.project;
		interviewsCount = project.interviewsCount;
		eventsCount = project.eventsCount;
		itemsCount = project.itemsCount;
		peopleCount = project.peopleCount;
	}

	return (
		<Dashboard
			 interviewsCount={interviewsCount}
			 eventsCount={eventsCount}
			 itemsCount={itemsCount}
			 peopleCount={peopleCount}
		/>
	);
}

export default compose(
	countsQuery,
)(DashboardContainer);
