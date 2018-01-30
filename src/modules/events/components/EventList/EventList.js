import React from 'react';
import PropTypes from 'prop-types';

import NoResults from '../../../../components/pagination/NoResults';
import EventListItem from '../EventListItem';

import './EventList.css';


const EventList = ({ events, horizontal }) => {
	const classes = [];


	if (horizontal) {
		classes.push('eventListHorizontal');
	}

	return (
		<div className={`eventList ${classes.join(' ')}`}>
			{events.map((listItem, i) => (
				<EventListItem
					key={`${listItem.slug}-${i}`}
					{...listItem}
				/>
			))}

			{!events || !events.length ?
				<NoResults
					message="No events have been added to this collection yet."
				/>
			: ''}
		</div>
	);
};

EventList.propTypes = {
	events: PropTypes.array,
};

EventList.defaultProps = {
	events: [],
};

export default EventList;
