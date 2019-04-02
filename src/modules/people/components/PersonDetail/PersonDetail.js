import React from 'react';

import Tags from '../../../tags/components/Tags';

import ItemImageViewer from '../../../items/components/ItemImageViewer';
import ItemTitle from '../../../items/components/ItemTitle';
import ItemDescription from '../../../items/components/ItemDescription';
import ItemMetaFields from '../../../items/components/ItemMetaFields';

import Discussion from '../../../comments/components/Discussion';

import PersonItemMetaFieldItemsContainer from '../../containers/PersonItemMetaFieldItemsContainer';


import './PersonDetail.css';

const PersonDetail = ({
	_id, name, slug, bio, tags, metadata, files, commentsCount, comments,
	userIsAdmin, manifest, handleRemove, events, interviews, items
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
					title={name}
					editLink={userIsAdmin ? `/people/${_id}/${slug}/edit` : null}
					handleRemove={userIsAdmin ? handleRemove : null}
				/>
				<ItemDescription
					description={bio}
				/>
				<Tags
					tags={tags}
				/>

				<ItemMetaFields
					metafields={metadata}
				/>

				<PersonItemMetaFieldItemsContainer
					label="Interviews"
					ids={interviews}
					type="interview"
				/>

				<PersonItemMetaFieldItemsContainer
					label="Events"
					ids={events}
					type="event"
				/>

				<PersonItemMetaFieldItemsContainer
					label="Items"
					ids={items}
					type="item"
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
