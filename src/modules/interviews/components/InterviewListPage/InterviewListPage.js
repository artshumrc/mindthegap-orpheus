import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import CollectionCover from '../../../collections/components/CollectionCover';
import Pagination from '../../../../components/pagination/Pagination';
import InterviewListContainer from '../../containers/InterviewListContainer';


import './InterviewListPage.css';

const InterviewListPage = props => {

	let files = [];
	let coverImage = null;

	if (props.files && props.files.length) {
		files = props.files;
	}

	if (files.length) {
		coverImage = _.sample(files).name;
	}


	return (
		<div >
			<CollectionCover
				title="Interviews"
				coverImage={coverImage}
				coverLink={props.userIsAdmin ? '/interviews/create' : null}
				coverLinkText={props.userIsAdmin ? 'Create new' : null}
			/>
			<InterviewListContainer />
			<Pagination
				total={props.interviewsCount}
				limit={18}
			/>
		</div>
	);
}

InterviewListPage.propTypes = {
	userIsAdmin: PropTypes.bool,
	interviewsCount: PropTypes.number,
};

InterviewListPage.defaultProps = {
	userIsAdmin: false,
	interviewsCount: 0,
};

export default InterviewListPage;
