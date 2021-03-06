import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import CollectionCover from '../../../collections/components/CollectionCover';
import Pagination from '../../../../components/pagination/Pagination';
import EventListContainer from '../../containers/EventListContainer';


import './EventListPage.css';

const EventListPage = props => {

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
				title="Events"
				coverImage={coverImage}
				coverLink={props.userIsAdmin ? '/events/create' : null}
				coverLinkText={props.userIsAdmin ? 'Create new' : null}
			/>
			<EventListContainer />
			<Pagination
				total={props.eventsCount}
				limit={18}
			/>
		</div>
	);
}

EventListPage.propTypes = {
	userIsAdmin: PropTypes.bool,
	eventsCount: PropTypes.number,
};

EventListPage.defaultProps = {
	userIsAdmin: false,
	eventsCount: 0,
};

export default EventListPage;
