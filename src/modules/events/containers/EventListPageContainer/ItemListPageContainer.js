import React from 'react';
import { compose } from 'react-apollo';

import EventListPage from '../../components/EventListPage';
import userIsAdminQuery from '../../../users/graphql/queries/userIsAdmin';
import itemListQuery from '../../graphql/queries/list';


const EventListPageContainer = (props) => {
	let userIsAdmin = false;
	let files = [];

	if (
		props.userIsAdminQuery
		&& props.userIsAdminQuery.project
	) {
		userIsAdmin = props.userIsAdminQuery.project.userIsAdmin;
	}

	if (
		props.itemListQuery
		&& props.itemListQuery.project
	) {
		files = props.itemListQuery.project.files;
	}

	return (
		<EventListPage
			userIsAdmin={userIsAdmin}
			files={files}
		/>
	);
};

export default compose(
	userIsAdminQuery,
	itemListQuery,
)(EventListPageContainer);
