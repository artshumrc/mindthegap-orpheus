import React from 'react';
import './ItemMetaFieldStoryMap.css';


const ItemMetaFieldStoryMap = ({ storymap, value, label }) => {
	//Todo: check that value is valid url
	return (
		<div className="itemMetaField">
			<label>{label}</label>
			<iframe id="ifrm" width="100%" height="800px" src={value}
				frameborder="0" scrolling="no"></iframe>
		</div>
	);
}


export default ItemMetaFieldStoryMap;
