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
		const _selectedItems = selectedItems.slice();
		let items = [];

		if (
			this.props.itemListQuery
			&& this.props.itemListQuery.project
			&& this.props.itemListQuery.project.items
			&& this.props.eventListQuery
			&& this.props.eventListQuery.project
			&& this.props.eventListQuery.project.events
			&& this.props.interviewListQuery
			&& this.props.interviewListQuery.project
			&& this.props.interviewListQuery.project.interviews
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

			// add join values from the database for item selector fields on forms with
			// initial values
			const projectItems = this.props.itemListQuery.project.items;
			const interviews = this.props.interviewListQuery.project.interviews;
			const events = this.props.eventListQuery.project.events;
			const all = [...projectItems, ...interviews, ...events];
			for (let i = 0; i < _selectedItems.length; i += 1) {
				let selectedItem = _selectedItems[i];
				if (selectedItem && typeof selectedItem === 'string') {
					all.forEach(item => {
						if (item._id === selectedItem) {
							_selectedItems[i] = item;
						}
					})
				}
			}
		}


		// don't show the items that are common between lists
		_selectedItems.forEach(selectedItem => {
			items.forEach(item => {
				if (
						item
					&& selectedItem
					&& item._id === selectedItem._id
				) {
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
				selectedItems={_selectedItems}
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
