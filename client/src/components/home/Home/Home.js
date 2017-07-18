import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';
import './Home.css';
import Header from '../../navigation/Header';
import AboutSection from './sections/AboutSection';
import PopularCollectionsSection from './sections/PopularCollectionsSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialSection from './sections/TestimonialSection';
import WhyUsSection from './sections/WhyUsSection';
import BetterExperienceSection from './sections/BetterExperienceSection';
import PricingSection from './sections/PricingSection';
import CreateAccountSection from './sections/CreateAccountSection';
import Footer from './sections/Footer';

class Home extends React.Component {
	render() {
		return (
			<div id="home">
				<Header />
				<Jumbotron id="home" className="header-jumbotron">
					<div className="jumbotron-overlay" />
					<div className="jumbotron-content">
						<h1>The archive, reimagined</h1>
						<p>Create and share digital collections across platforms when, where, and how you want</p>
						<p>
							<Button bsStyle="secondary">Get started</Button>
							<Button bsStyle="primary">Learn more</Button>
						</p>
					</div>
					<div className="layer" />
				</Jumbotron>
				<AboutSection />
				<PopularCollectionsSection />
				<FeaturesSection />
				<TestimonialSection />
				<WhyUsSection />
				<BetterExperienceSection />
				<PricingSection />
				<CreateAccountSection />
				<Footer />
			</div>
		);
	}
}

export default Home;
