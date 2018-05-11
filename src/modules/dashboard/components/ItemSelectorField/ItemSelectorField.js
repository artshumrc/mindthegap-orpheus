import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';

import ItemSelectorItemList from '../ItemSelectorItemList';
import ItemSelectorItemListContainer from '../../containers/ItemSelectorItemListContainer';

import './ItemSelectorField.css';



const ItemSelectorField = ({ collectionName, selectedItems, toggleSelectedItem }) => (
	<div className="itemSelector">
		<Row>
			<Col md={6}>
				<div className="itemSelectorItems">
					<label>
						{collectionName === 'items' ?
							<span>Items <Link to="/items/create">Create a new item</Link></span>
						: ''}
						{collectionName === 'events' ?
							<span>Events <Link to="/events/create">Create a new event</Link></span>
						: ''}
						{collectionName === 'interviews' ?
							<span>Interviews <Link to="/interviews/create">Create a new interview</Link></span>
						: ''}
					</label>
					<ItemSelectorItemListContainer
						selectedItems={selectedItems}
						toggleSelectedItem={toggleSelectedItem}
						collectionName={collectionName}
					/>
				</div>
			</Col>
			<Col md={6}>
				<div className="itemSelectorItems">
					<label>
						Selected
					</label>
					<ItemSelectorItemList
						items={selectedItems}
						toggleSelectedItem={toggleSelectedItem}
						showUnselect
					/>
				</div>
			</Col>
		</Row>
	</div>
);

export default ItemSelectorField;
