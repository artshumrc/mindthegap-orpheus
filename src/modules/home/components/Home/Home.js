import React from 'react';
import './Home.css';
import Header from '../../../../components/navigation/Header';
import Footer from '../../../../components/navigation/Footer';
import HomeCover from './sections/HomeCover';
import AboutSection from './sections/AboutSection';
// import ShowcaseCollections from './sections/ShowcaseCollections';
import FeaturesSection from './sections/FeaturesSection';
import LifetimeData from './sections/LifetimeData';
import PermissionsSection from './sections/PermissionsSection';
// import ExploreOrDemo from './sections/ExploreOrDemo';
import ReadyToStart from './sections/ReadyToStart';

class Home extends React.Component {
	render() {
		return (
			<div id="home">
				<Header />
				<HomeCover />
				<AboutSection />
				<FeaturesSection />

				{/* TODO: explore collections when there are collections to explorew
					<ShowcaseCollections />
				*/}

				<LifetimeData />
				<PermissionsSection />

				{/* TODO: create explore and demo pages
					<ExploreOrDemo />
				*/}

				<ReadyToStart />
				<Footer />
			</div>
		);
	}
}

export default Home;
