import React from 'react';
import Tags from '../../../tags/components/Tags';

import ItemImageViewer from '../../../items/components/ItemImageViewer';
import ItemTitle from '../../../items/components/ItemTitle';
import ItemDescription from '../../../items/components/ItemDescription';
import ItemMetaFields from '../../../items/components/ItemMetaFields';

import Discussion from '../../../comments/components/Discussion';

import './EventDetail.css';

const EventDetail = ({
	_id, title, slug, dateDisplay, description, tags, metadata, files, commentsCount, comments,
	userIsAdmin, manifest, handleRemove
})=> {

	if (!_id) {
		// TODO: loading or no results
		return null;
	}

	let _metadata = metadata.slice();
	if (dateDisplay) {
		_metadata.push({
			type: 'text',
			label: 'Date',
			value: dateDisplay,
		});
	}

	return (
		<div className="eventDetail">

			{files ?
				<ItemImageViewer
					itemMiradorLink={ manifest ? `/events/${_id}/${slug}/mirador` : null}
					files={files}
				/>
			: ''}

			<div className="eventDetailColumn">
				<ItemTitle
					_id={_id}
					title={title}
					editLink={userIsAdmin ? `/events/${_id}/${slug}/edit` : null}
					handleRemove={userIsAdmin ? handleRemove : null}
				/>
				<ItemDescription
					description={description}
				/>
				<Tags
					tags={tags}
				/>
				<ItemMetaFields
					metafields={_metadata}
				/>
				<Discussion
					commentsCount={commentsCount}
					comments={comments}
				/>
			</div>
		</div>
	);
}


export default EventDetail;
