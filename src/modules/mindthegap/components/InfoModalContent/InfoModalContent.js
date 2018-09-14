import React from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import ItemImageViewer from '../../../items/components/ItemImageViewer';

import './InfoModalContent.css';


const InfoModalContent = props => {

	return (
		<div className="infoModalContent">

			<div className="infoModalTitle">
				<h1>{props.title}</h1>
			</div>
			<div className="infoModalMedia">
				{props.files ?
					<ItemImageViewer
						itemMiradorLink={ props.manifest ? `/${props.collectionType}/${props._id}/${props.slug}/mirador` : null}
						files={props.files}
					/>
				: ''}
			</div>
			<div className="infoModalBody">
				<Row>
					<Col md={8}>
						<div className="infoModalContentText">
							<p>
								{props.description}
							</p>
						</div>
					</Col>
					<Col md={4}>
						{/*
						<div className="infoModalContentDetails">
							<aside className="personAside withBorder">
								<div
									className="personAsideThumbnail"
									style={{
										backgroundImage: 'url(/images/example1.jpg)',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										height: '70px',
										width: '70px',
									}}
	              />
								<div className="personAsideText">
									<h4>Juan Bosch</h4>
									<p>Yolanda: I went once on vacation to Barahona . . .</p>
								</div>
							</aside>
							<aside className="personAside">
								<div
									className="personAsideThumbnail"
									style={{
										backgroundImage: 'url(/images/example2.jpg)',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										height: '70px',
										width: '70px',
									}}
	              />
								<div className="personAsideText">
									<h4>Piky Lora</h4>
									<p>Yolanda: I went once on vacation to Barahona . . .</p>
								</div>
							</aside>
							<aside className="personAside">
								<div
									className="personAsideThumbnail"
									style={{
										backgroundImage: 'url(/images/example3.jpg)',
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										height: '70px',
										width: '70px',
									}}
	              />
								<div className="personAsideText">
									<h4>Teresa Espaillant</h4>
									<p>Yoland: I went once on vacation to Barahona . . .</p>
								</div>
							</aside>
						</div>
						*/}
					</Col>
				</Row>
			</div>
			{/*
			<div className="infoModalSimilar">
				<h2>Items Similar to this Post</h2>
				<div className="itemRelatedList">
					<div className="itemRelatedTeaser">
						<div
							className="itemRelatedTeaserThumbnail"
							style={{
	  						backgroundImage: 'url(/images/example4.jpg)',
	  						backgroundSize: 'cover',
	  						backgroundPosition: 'center',
	  						backgroundRepeat: 'no-repeat',
	  						height: '300px',
	  						width: '320px',
	  					}}
	          />
						<h4 className="itemRelatedTeaserTitle">
	            1965 Immigration Act
						</h4>
						<label className="itemRelatedTeaserLabel">
	            Santo Domingo, Dominican Republic
						</label>
					</div>
					<div className="itemRelatedTeaser">
						<div
							className="itemRelatedTeaserThumbnail"
							style={{
	  						backgroundImage: 'url(/images/example7.jpg)',
	  						backgroundSize: 'cover',
	  						backgroundPosition: 'center',
	  						backgroundRepeat: 'no-repeat',
	  						height: '300px',
	  						width: '320px',
	  					}}
	          />
						<h4 className="itemRelatedTeaserTitle">
	            La Guerra de Abril
						</h4>
						<label className="itemRelatedTeaserLabel">
	            Santo Domingo, Dominican Republic
						</label>
					</div>
					<div className="itemRelatedTeaser">
						<div
							className="itemRelatedTeaserThumbnail"
							style={{
	  						backgroundImage: 'url(/images/example6.jpg)',
	  						backgroundSize: 'cover',
	  						backgroundPosition: 'center',
	  						backgroundRepeat: 'no-repeat',
	  						height: '300px',
	  						width: '320px',
	  					}}
	          />
						<h4 className="itemRelatedTeaserTitle">
	            Transnational Commemoration
						</h4>
						<label className="itemRelatedTeaserLabel">
	            Santo Domingo, Dominican Republic
						</label>
					</div>

				</div>
			</div>
			*/}
		</div>
	);
}

export default InfoModalContent;
