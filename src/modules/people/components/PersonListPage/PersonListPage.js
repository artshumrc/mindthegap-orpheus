import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import CollectionCover from '../../../collections/components/CollectionCover';
import Pagination from '../../../../components/pagination/Pagination';
import PersonListContainer from '../../containers/PersonListContainer';


import './PersonListPage.css';

const PersonListPage = props => {

	let files = [];
	let coverImage = null;

	if (props.files && props.files.length) {
		files = props.files;
	}

	if (files.length) {
		coverImage = _.sample(files).name;
	}


	return (
		<div >
			<CollectionCover
				title="People"
				coverImage={coverImage}
				coverLink={props.userIsAdmin ? '/people/create' : null}
				coverLinkText={props.userIsAdmin ? 'Create new' : null}
			/>
			<PersonListContainer />
			<Pagination
				total={props.itemsCount}
				limit={18}
			/>
		</div>
	);
}

PersonListPage.propTypes = {
	userIsAdmin: PropTypes.bool,
	itemsCount: PropTypes.number,
};

PersonListPage.defaultProps = {
	userIsAdmin: false,
	itemsCount: 0,
};

export default PersonListPage;
