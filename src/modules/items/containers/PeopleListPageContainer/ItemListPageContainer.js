import React from 'react';
import { compose } from 'react-apollo';

import PeopleListPage from '../../components/PeopleListPage';
import userIsAdminQuery from '../../../users/graphql/queries/userIsAdmin';
import itemListQuery from '../../graphql/queries/list';


const PeopleListPageContainer = (props) => {
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
		<PeopleListPage
			userIsAdmin={userIsAdmin}
			files={files}
		/>
	);
};

export default compose(
	userIsAdminQuery,
	itemListQuery,
)(PeopleListPageContainer);
