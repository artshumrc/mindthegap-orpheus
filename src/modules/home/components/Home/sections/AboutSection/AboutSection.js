import React from 'react';
import _ from 'underscore';

import ExampleItem from '../ExampleItem';

import './AboutSection.css';

export default class AboutSection extends React.Component {
	render() {
		const exampleItems = [{
			imageUrl: '//iiif.orphe.us/orpheus/art/62.jpg/full/400,/0/default.jpg',
			title: 'Tree A / Boom A',
			description: 'Mondrian, Piet. 1913. Oil-painting on canvas; location: Tate Modern London. Accessed via Wikimedia.',
		}, {
			imageUrl: '//iiif.orphe.us/orpheus/art/1.jpg/full/400,/0/default.jpg',
			title: '"The Annunciation", Pidgeon Triptich',
			description: 'Mass, Tjaarke Hendrika Maria. 1999. Charcoal, egg tempera, paper on canvas. Accessed via Wikimedia.',
		}, {
			imageUrl: '//iiif.orphe.us/orpheus/art/74.jpg/full/400,/0/default.jpg',
			title: 'A Hunt in the Papyrus Thicket',
			description: 'Wall painting in the tomb of Nabamun. Before 1350 BC. Tempera on plaster. Accessed via Wikimedia.',
		}, {
			imageUrl: '//iiif.orphe.us/orpheus/art/73.jpg/full/400,/0/default.jpg',
			title: 'Fol 012v, The Tudor Pattern Book',
			description: 'Bodleian Library, MS. Ashmole 1504. Accessed via Wikimedia.',
		}, {
			imageUrl: '//iiif.orphe.us/orpheus/art/26.jpg/full/400,/0/default.jpg',
			title: 'Circle of Melchior Lorck',
			description: 'From "Studies of Men and Women in Arab, Medieval and other Costumes". Circa 1527-1594. Accessed via Wikimedia.',
		}];

		return (
			<section id="learn">
				<div className="aboutIntro">
					<div className="aboutImage">
						<ExampleItem
							{..._.sample(exampleItems)}
						/>
					</div>
					<blockquote className="aboutLead">
						<p>
							A thing of beauty is a joy forever
							<br />
							. . . it will never pass into nothingness.
						</p>
						<p className="quoteByline">
							John Keats, &quot;Endymion&quot;
						</p>
					</blockquote>
				</div>
				<div className="aboutText">
					<p>
						Preserve the items in your archive, museum, or library digitally for the next generation.
					</p>
					<p>
						We partner with you to plan for the full lifetime of your digital collection, share it with who you want to share it with, and archive it for the perpetual future.
					</p>
				</div>
			</section>
		);
	}
}
