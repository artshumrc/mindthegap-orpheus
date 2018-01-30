import React from 'react';

import Tags from '../../../tags/components/Tags';

import ItemImageViewer from '../../../items/components/ItemImageViewer';
import ItemTitle from '../../../items/components/ItemTitle';
import ItemDescription from '../../../items/components/ItemDescription';
import ItemMetaFields from '../../../items/components/ItemMetaFields';

import Discussion from '../../../comments/components/Discussion';


import './PersonDetail.css';

const PersonDetail = ({
	_id, title, slug, description, tags, metadata, files, commentsCount, comments,
	userIsAdmin, manifest, handleRemove
})=> {

	if (!_id) {
		// TODO: loading or no results
		return null;
	}

	return (
		<div className="personDetail">

			{files ?
				<ItemImageViewer
					itemMiradorLink={ manifest ? `/people/${_id}/${slug}/mirador` : null}
					files={files}
				/>
			: ''}

			<div className="personDetailColumn">
				<ItemTitle
					_id={_id}
					title={title}
					editLink={userIsAdmin ? `/people/${_id}/${slug}/edit` : null}
					handleRemove={userIsAdmin ? handleRemove : null}
				/>
				<ItemDescription
					description={description}
				/>
				<Tags
					tags={tags}
				/>
				<ItemMetaFields
					metafields={metadata}
				/>
				<Discussion
					commentsCount={commentsCount}
					comments={comments}
				/>
			</div>
		</div>
	);
}


export default PersonDetail;
