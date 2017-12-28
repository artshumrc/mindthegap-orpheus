import React from 'react';
import PropTypes from 'prop-types';


import ItemMetaField from '../ItemMetaField';

import './ItemMetaFields.css';


const ItemMetaFields = ({ metafields }) => {

	console.log('######')
	console.log('######')
	console.log('######')
	console.log(metafields);

	return (
		<div className="itemMetaFields">
			{metafields.map(metafield => (
				<ItemMetaField
					key={metafield.label}
					{...metafield}
				/>
			))}
		</div>
	);
}

ItemMetaFields.propTypes = {
	metafields: PropTypes.array,
};

ItemMetaFields.defaultProps = {
	metafields: [],
};

export default ItemMetaFields;
