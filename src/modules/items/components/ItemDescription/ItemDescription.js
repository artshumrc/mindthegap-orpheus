import React from 'react';
import PropTypes from 'prop-types';

import './ItemDescription.css';

const ItemDescription = ({ description }) => (
	<div
		className="itemDescription"
		dangerouslySetInnerHTML={{ __html: description }}
	/>
);

ItemDescription.propTypes = {
	description: PropTypes.string,
};

ItemDescription.defaultProps = {
	description: ''
};


export default ItemDescription;
