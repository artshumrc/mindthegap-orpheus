import React from 'react';
import { compose } from 'react-apollo';

// component
import ItemMetaFieldItem from '../../../items/components/ItemMetaFieldItem';

// graphql
import personItemMetaFieldItemsQuery from '../../graphql/queries/personItemMetaFieldItems';


const PersonItemMetaFieldItemsContainer = props => {
	let items = [];

	console.log(props);
	console.log(props);
	console.log(props);
	console.log(props);
	console.log(props);
	if (props.personItemMetaFieldItemsQuery && props.personItemMetaFieldItemsQuery.project) {
		switch(props.type) {
		case 'interview':
			items = props.personItemMetaFieldItemsQuery.project.interviews;
			break;
		case 'event':
			items = props.personItemMetaFieldItemsQuery.project.events;
			break;
		case 'item':
			items = props.personItemMetaFieldItemsQuery.project.items;
			break;
		default:
			break;
		}
	}

	if (!items || !items.length) {
		return null;
	}

	return (
		<ItemMetaFieldItem
			label={props.label}
			value={items}
		/>
	);
}

export default compose(
	personItemMetaFieldItemsQuery,
)(PersonItemMetaFieldItemsContainer);
