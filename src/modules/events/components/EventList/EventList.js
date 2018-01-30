import React from 'react';
import PropTypes from 'prop-types';

import NoResults from '../../../../components/pagination/NoResults';
import EventListItem from '../EventListItem';

import './EventList.css';


const EventList = ({ items, horizontal }) => {
	const classes = [];


	if (horizontal) {
		classes.push('itemListHorizontal');
	}

	return (
		<div className={`itemList ${classes.join(' ')}`}>
			{items.map((listItem, i) => (
				<EventListItem
					key={`${listItem.slug}-${i}`}
					{...listItem}
				/>
			))}

			{!items || !items.length ?
				<NoResults
					message="No items have been added to this collection yet."
				/>
			: ''}
		</div>
	);
};

EventList.propTypes = {
	items: PropTypes.array,
};

EventList.defaultProps = {
	items: [],
};

export default EventList;
