import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import _ from 'underscore';

import EventList from '../../components/EventList';
import itemListQuery from '../../graphql/queries/list';


class EventListContainer extends React.Component {
	render() {
		let items = [];

		if (
			this.props.itemListQuery
			&& this.props.itemListQuery.project
		) {
			items = this.props.itemListQuery.project.items;
		}

		if (items.length && this.props.limit && this.props.random) {
			let _items = [];

			for (let i = 0; i < this.props.limit; i++){
				_items.push(_.sample(items));
			}
			items = _items;
		}

		return (
			<EventList
				items={items}
			/>
		);
	}
}

EventListContainer.propTypes = {
	itemListQuery: PropTypes.object,
};

export default compose(
	itemListQuery,
)(EventListContainer);
