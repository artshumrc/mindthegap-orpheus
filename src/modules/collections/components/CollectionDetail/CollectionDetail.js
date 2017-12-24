import React from 'react';
import PropTypes from 'prop-types';

import CollectionCover from '../CollectionCover';
import CollectionDescription from '../CollectionDescription';
import ItemsList from '../../../items/components/ItemsList';
import Pagination from '../../../../components/pagination/Pagination';

import './CollectionDetail.css';


const CollectionDetail = props => (
	<div >
		<CollectionCover
			title={props.title}
			coverImage={props.coverImage}
		/>
		{props.description ?
			<CollectionDescription
				description={props.description}
			/>
		: ''}
		<ItemsList
			items={props.items}
		/>
		<Pagination
			total={props.itemsCount}
			limit={18}
			page={0}
		/>
	</div>
);

CollectionDetail.propTypes = {
	_id: PropTypes.string,
	title: PropTypes.string,
	slug: PropTypes.string,
	coverImage: PropTypes.string,
	description: PropTypes.string,
	items: PropTypes.array,
};


CollectionDetail.defaultProps = {
	_id: '',
	title: '',
	slug: '',
	coverImage: '',
	description: '',
	items: [],
	itemsCount: 0,
};

export default CollectionDetail;
