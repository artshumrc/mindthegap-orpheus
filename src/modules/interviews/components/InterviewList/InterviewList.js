import React from 'react';
import PropTypes from 'prop-types';

import NoResults from '../../../../components/pagination/NoResults';
import InterviewListItem from '../InterviewListItem';

import './InterviewList.css';


const InterviewList = ({ interviews, horizontal }) => {
	const classes = [];


	if (horizontal) {
		classes.push('interviewListHorizontal');
	}

	return (
		<div className={`itemList interviewList ${classes.join(' ')}`}>
			{interviews.map((listItem, i) => (
				<InterviewListItem
					key={`${listItem.slug}-${i}`}
					{...listItem}
				/>
			))}

			{!interviews || !interviews.length ?
				<NoResults
					message="No interviews have been added to this collection yet."
				/>
			: ''}
		</div>
	);
};

InterviewList.propTypes = {
	interviews: PropTypes.array,
};

InterviewList.defaultProps = {
	interviews: [],
};

export default InterviewList;
