import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

import ItemSelectorItemList from '../../components/ItemSelectorItemList';
import eventsQuery from '../../../events/graphql/queries/list';
import interviewsQuery from '../../../interviews/graphql/queries/list';
import itemsQuery from '../../../items/graphql/queries/list';


class ItemSelectorItemListContainer extends React.Component {
	render() {
		const { selectedItems } = this.props;
		let items = [];

		if (
			this.props.itemListQuery
			&& this.props.itemListQuery.project
			&& this.props.eventListQuery
			&& this.props.eventListQuery.project
			&& this.props.interviewListQuery
			&& this.props.interviewListQuery.project
		) {
			switch (this.props.collectionName) {
			case 'items':
				items = this.props.itemListQuery.project.items.slice();
				break;

			case 'interviews':
				items = this.props.interviewListQuery.project.interviews.slice();
				break;

			case 'events':
				items = this.props.eventListQuery.project.events.slice();
				break;

			default:
				items = this.props.itemListQuery.project.items.slice();
				break;
			}
		}


		// don't show the items that are common between lists
		selectedItems.forEach(selectedItem => {
			items.forEach(item => {
				if (item._id === selectedItem._id) {
					items.splice(
						items.findIndex( _i => _i._id === item._id),
						1
					);
				}
			});
		});


		return (
			<ItemSelectorItemList
				items={items}
				selectedItems={selectedItems}
				toggleSelectedItem={this.props.toggleSelectedItem}
			/>
		);
	}
}

ItemSelectorItemListContainer.propTypes = {
	toggleSelectedItem: PropTypes.func.isRequired,
	selectedItems: PropTypes.array,
};

ItemSelectorItemListContainer.defaultProps = {
	selectedItems: [],
};

export default compose(
	itemsQuery,
	interviewsQuery,
	eventsQuery,
)(ItemSelectorItemListContainer);
