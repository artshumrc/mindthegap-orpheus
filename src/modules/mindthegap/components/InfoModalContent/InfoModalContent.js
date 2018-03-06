import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player'

import './InfoModalContent.css';

const InfoModalContent = props => (
	<div className="infoModalContent">

		<div className="infoModalTitle">
			<h1>Interview with Yolanda</h1>
		</div>
		<div className="infoModalMedia">
			<ReactPlayer
				url='/videos/yolanda_short.mp4'
				width="100%"
				height="540px"
				controls
      />
		</div>
		<div className="infoModalBody">
			<Row>
				<Col md={8}>
					<div className="infoModalContentText">
						<p>
              On April 28, 1965 the US military landed in Santo Domingo with the excuse of protecting American investment in the island during the civil war that had begun a few days earlier. The  purpose of the war was to restore the democratically elected president, Juan Bosch, whose presidency was terminated by U.S. backed military coup on September 25, 1963. A triumvirate was established shortly after, but dissidence and the desire for democracy produced a series of social upheavals that ultimately gained the support of the liberal faction of the military that favored a return to the constitution and the elected president, Juan Bosch. After three days of battle, however, the United States invaded the island and sided with the coup leaders, preventing Juan Bosch from occupying the presidential position that he had earned during the 1962 elections. The presence of the Marines created a sense of frustration among Dominican rebels who felt impotent as the 1965 efforts were crushed by the giant fist of the US intervention forces. La Guerra de Abril, which coincided with both Vietman War and with the U.S. 1965 Immigration Act, led to the massive emigration of Dominicans to the United States.
						</p>
						<p>
              Perhaps because of the overwhelming support the Guerra de Abril sustained among the peasantry and the left-wing intellectuals alike, it is one of the most studied Twentieth Centuries events in Dominican history. In 2015, a transnational commemoration of the War was organized by the Dominican state leading to photographic exhibits, publications, public events and the recognition of multiple actors in a public ceremony held at the palace.  Aside from a hand full of women, Yolanda Guzman, Piky Lora and Teresa Espaillant, all photographs, books, and public consecrations of the heroes of the 1965 war were men. Yet oral narratives, collective memory as well as preliminary research conducted by Margarita Cordero, demonstrate that the 1965 war would have not been possible had it not been for the women who risk their lives transporting weapons, serving as messengers, tricking the Marines or combating in battle. Despite their contribution the majority of women of La Guerra de Abril have been relegated to obscurity by a male-dominated archive.
						</p>
					</div>
				</Col>
				<Col md={4}>
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
				</Col>
			</Row>
		</div>
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
	</div>
);

export default InfoModalContent;
