import React from 'react';
import autoBind from 'react-autobind';

import ProjectHeaderContainer from '../../containers/ProjectHeaderContainer';
import MTGVis from './sections/ProjectVisualization/MTGVis';
import InfoModalContent from '../InfoModalContent';
import Modal from '../../../../components/common/modal/Modal';

import './ProjectHome.css';
import '../../../home/components/Home/Home.css';
import './sections/ProjectVisualization/mtgvis.css';


class ProjectHome extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			showInfoModal: false,
		};

		autoBind(this);
	}

	handleToggleInfoModal(e) {
		e.preventDefault();
		this.setState({
			showInfoModal: !this.state.showInfoModal,
		});
		console.log("clicked");
	}

	render() {
		return (
			<div id="home" className="projectHome">
				{/* Header */}
				<ProjectHeaderContainer />
					<MTGVis handleToggleInfoModal={this.handleToggleInfoModal}/>

				<Modal
					show={this.state.showInfoModal}
					closeModal={this.handleToggleInfoModal}
					innerFullWidth
				>
					<InfoModalContent />
				</Modal>
			</div>
		);
	}
}

export default ProjectHome;
