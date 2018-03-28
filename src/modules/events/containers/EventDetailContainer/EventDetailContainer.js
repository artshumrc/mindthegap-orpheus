import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';

// components
import EventDetail from '../../components/EventDetail';

// graphql
import eventListQuery from '../../graphql/queries/list';
import eventDetailQuery from '../../graphql/queries/detail';
import eventRemoveMutation from '../../graphql/mutations/remove';


class EventDetailContainer extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	handleRemove(eventId) {
		const { eventRemove, router } = this.props;

		eventRemove(eventId)
			.then((response) => {
				router.replace('/events');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		let event = [];
		let userIsAdmin = false;

		if (
			this.props.eventQuery
			&& this.props.eventQuery.project
		) {
			event = this.props.eventQuery.project.event;
			userIsAdmin = this.props.eventQuery.project.userIsAdmin;
		}

		return (
			<EventDetail
				{...event}
				userIsAdmin={userIsAdmin}
				handleRemove={this.handleRemove}
			/>
		);
	}
}

export default compose(
	eventListQuery, eventDetailQuery, eventRemoveMutation
)(EventDetailContainer);
