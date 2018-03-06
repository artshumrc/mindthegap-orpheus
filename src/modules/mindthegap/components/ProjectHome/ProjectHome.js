import React from 'react';
import autoBind from 'react-autobind';

import ProjectHeaderContainer from '../../containers/ProjectHeaderContainer';
import ProjectVisualization from './sections/ProjectVisualization';
import InfoModalContent from '../InfoModalContent';
import Modal from '../../../../components/common/modal/Modal';

import './ProjectHome.css';
import '../../../home/components/Home/Home.css';


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
	}

	render() {
		return (
			<div id="home" className="projectHome">
				{/* Header */}
				<ProjectHeaderContainer />

				<ProjectVisualization
					handleToggleInfoModal={this.handleToggleInfoModal}
				/>

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
