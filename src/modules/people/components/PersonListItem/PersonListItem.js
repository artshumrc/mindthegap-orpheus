import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _s from 'underscore.string';

import Tags from '../../../tags/components/Tags';

import './PersonListItem.css';


const PersonListItem = (props) => {
	const itemUrl = `/people/${props._id}/${props.slug}`;

	let files = [];
	let imageUrl = null;

	if (props.files && props.files.length) {
		files = props.files;
	}

	if (files.length) {
		imageUrl = `//iiif.orphe.us/${files[0].name}/full/300,/0/default.jpg`;
	}

	return (
		<div className="personListItem">
			{imageUrl ?
				<Link to={itemUrl}>
					<img src={imageUrl} alt={props.title} />
				</Link>
			: ''}
			<Tags tags={props.tags} />
			<Link to={itemUrl}>
				<h3>{props.name}</h3>
			</Link>
			<p className="description">
				{_s.prune(props.description, 90)}
			</p>
		</div>
	);
};

PersonListItem.propTypes = {
	imageUrl: PropTypes.string,
	tags: PropTypes.array,
	title: PropTypes.string,
	slug: PropTypes.string,
	description: PropTypes.string,
};

export default PersonListItem;
