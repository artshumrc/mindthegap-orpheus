import React from 'react';
import pluralize from 'pluralize';

// components
import Tags from '../../../tags/components/Tags';
import ItemTitle from '../../../items/components/ItemTitle';
import ItemImageViewer from '../../../items/components/ItemImageViewer';
import ItemDescription from '../../../items/components/ItemDescription';
import ItemMetaFields from '../../../items/components/ItemMetaFields';
import PersonItemMetaFieldItemsContainer from '../../../people/containers/PersonItemMetaFieldItemsContainer';


import './InfoModalContent.css';


const InfoModalContent = props => {
	console.log(props);
	console.log(props);
	console.log(props);
	console.log(props);

	return (
		<div className="infoModalContent">

			<div className="infoModalTitle">
				<ItemTitle
					_id={props._id}
					title={props.name || props.title}
					editLink={props.userIsAdmin ? `/people/${props._id}/${props.slug}/edit` : null}
					handleRemove={props.userIsAdmin ? props.handleRemove : null}
				/>
			</div>
			<div className="infoModalMedia">
				{props.files ?
					<ItemImageViewer
						itemMiradorLink={ props.manifest ? `/${pluralize(props.collectionType)}/${props._id}/${props.slug}/mirador` : null}
						files={props.files}
					/>
				: ''}
			</div>
			<div className="infoModalBody">
				<ItemDescription
					description={props.bio || props.description}
				/>

				<Tags
					tags={props.tags}
				/>

				<ItemMetaFields
					metafields={props.metadata}
				/>

				{props.interviews ?
					<PersonItemMetaFieldItemsContainer
						label="Interviews"
						ids={props.interviews}
						type="interview"
					/>
				: ''}

				{props.events ?
					<PersonItemMetaFieldItemsContainer
						label="Events"
						ids={props.events}
						type="event"
					/>
				: ''}

				{props.items ?
					<PersonItemMetaFieldItemsContainer
						label="Items"
						ids={props.items}
						type="item"
					/>
				: ''}

			</div>
		</div>
	);
}

export default InfoModalContent;
