import React from 'react';

import ItemList from '../ItemList';


import './ItemMetaFieldItem.css';


const ItemMetaFieldItem = ({ label, value, noResultsMessage })=> {
	let items = [];

	if (value) {
		if (typeof value === 'string') {
			items = JSON.parse(value);
		} else if (Array.isArray(value)) {
			items = value;
		} else {
			console.error('Unknown data type passed to ItemMetaFieldItem');
		}
	}

	return (
		<div className="itemMetaField">
			<label>
				{label}
			</label>
			<ItemList
				items={items}
				horizontal
  		/>
		</div>
	);
}

export default ItemMetaFieldItem;
