import React from 'react';
import PropTypes from 'prop-types';

import NoResults from '../../../../components/pagination/NoResults';
import PersonListItem from '../PersonListItem';

import './PersonList.css';


const PersonList = ({ people, horizontal }) => {
	const classes = [];


	if (horizontal) {
		classes.push('personListHorizontal');
	}

	return (
		<div className={`personList ${classes.join(' ')}`}>
			{people.map((listItem, i) => (
				<PersonListItem
					key={`${listItem.slug}-${i}`}
					{...listItem}
				/>
			))}

			{!people || !people.length ?
				<NoResults
					message="No people have been added to this collection yet."
				/>
			: ''}
		</div>
	);
};

PersonList.propTypes = {
	people: PropTypes.array,
};

PersonList.defaultProps = {
	people: [],
};

export default PersonList;
