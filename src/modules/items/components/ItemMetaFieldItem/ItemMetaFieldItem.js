import React from 'react';

import ItemList from '../ItemList';


import './ItemMetaFieldItem.css';


const ItemMetaFieldItem = ({ label, value })=> {

	let items = [];

	if (value) {
		items = JSON.parse(value);
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
