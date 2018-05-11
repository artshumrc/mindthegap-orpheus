import React from 'react';
import { compose } from 'react-apollo';

import listItemQuery from '../../graphql/queries/listItem';
import ItemSelectorItemListItem from '../../components/ItemSelectorItemListItem';





const ItemSelectorItemListItemContainer = props => {
	let listItem = null;

	if (
      props.listItemQuery
    && props.listItemQuery.project
  ) {
		if (props.listItemQuery.project.event) {
			listItem = props.listItemQuery.project.event;

		} else if (props.listItemQuery.project.item) {
			listItem = props.listItemQuery.project.item;

		} else if (props.listItemQuery.project.interview) {
			listItem = props.listItemQuery.project.interview;

		}
	}

	if (!listItem) {
		return null;
	}

	return (
		<ItemSelectorItemListItem
			key={listItem.slug}
			toggleSelectedItem={props.toggleSelectedItem}
			{...listItem}
  	/>
	);
};


export default compose(
	listItemQuery,
)(ItemSelectorItemListItemContainer);
