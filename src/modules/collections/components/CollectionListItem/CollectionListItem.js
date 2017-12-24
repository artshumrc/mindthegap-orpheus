import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import faker from 'faker';
import _ from 'underscore';
import { truncate } from 'underscore.string';

import Tags from '../../../tags/components/Tags';
import './CollectionListItem.css';

const CollectionListItem = (props) => {
	const collectionUrl = `/collections/${props.slug}`;
	let thumbnail = null;
	if (props.coverImage) {
		thumbnail = `http://iiif.orphe.us/${props.coverImage}/full/210,/0/default.jpg`;
	}

	return (
		<div className="collectionListItem">
			{props.coverImage ?
				<div className="collectionListItemImage">
					<Link to={collectionUrl}>
						<img alt={props.title} src={thumbnail} />
					</Link>
				</div>
			: ''}
			<div
				className={`
					collectionListItemBackground
					${props.coverImage ?
						'collectionListItemBackgroundWithImage'
					: ''}
				`}
			>
				<div className="collectionCount">
					{props.count} items
				</div>
				<Link to={collectionUrl}>
					<h3>{props.title}</h3>
				</Link>
				<p>
					{props.description}
				</p>
				<Link
					to={collectionUrl}
					className="collectionLink"
				>
					<span className="collectionLinkLabel">
						View the collection
					</span>
					<i className="collectionLinkIcon mdi mdi-chevron-right" />
				</Link>
			</div>
		</div>
	);
};

CollectionListItem.propTypes = {
	slug: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	coverImage: PropTypes.string,
};

CollectionListItem.defaultProps = {
	slug: '',
	title: '',
	description: '',
	coverImage: null,
	count: 0,
};

export default CollectionListItem;
