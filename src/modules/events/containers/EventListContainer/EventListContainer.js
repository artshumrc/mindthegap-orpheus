import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import _ from 'underscore';

import EventList from '../../components/EventList';
import eventListQuery from '../../graphql/queries/list';


class EventListContainer extends React.Component {
	render() {
		let events = [];

		if (
			this.props.eventListQuery
			&& this.props.eventListQuery.project
		) {
			events = this.props.eventListQuery.project.events;
		}

		if (events.length && this.props.limit && this.props.random) {
			let _events = [];

			for (let i = 0; i < this.props.limit; i++){
				_events.push(_.sample(events));
			}
			events = _events;
		}

		return (
			<EventList
				events={events}
			/>
		);
	}
}

EventListContainer.propTypes = {
	eventListQuery: PropTypes.object,
};

export default compose(
	eventListQuery,
)(EventListContainer);
