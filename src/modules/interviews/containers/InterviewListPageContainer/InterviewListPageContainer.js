import React from 'react';
import { compose } from 'react-apollo';

import InterviewListPage from '../../components/InterviewListPage';
import userIsAdminQuery from '../../../users/graphql/queries/userIsAdmin';
import interviewListQuery from '../../graphql/queries/list';


const InterviewListPageContainer = (props) => {
	let userIsAdmin = false;
	let files = [];

	if (
		props.userIsAdminQuery
		&& props.userIsAdminQuery.project
	) {
		userIsAdmin = props.userIsAdminQuery.project.userIsAdmin;
	}

	if (
		props.interviewListQuery
		&& props.interviewListQuery.project
	) {
		files = props.interviewListQuery.project.files;
	}

	return (
		<InterviewListPage
			userIsAdmin={userIsAdmin}
			files={files}
		/>
	);
};

export default compose(
	userIsAdminQuery,
	interviewListQuery,
)(InterviewListPageContainer);
