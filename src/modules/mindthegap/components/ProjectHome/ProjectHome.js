import React from 'react';
import { connect } from 'react-redux';

// components
import ProjectHeaderContainer from '../../containers/ProjectHeaderContainer';
import ProjectVisualization from './sections/ProjectVisualization';
import InfoModalContent from '../InfoModalContent';
import Modal from '../../../../components/common/modal/Modal';

// redux
import { setModal } from '../../actions';

import './ProjectHome.css';
import '../../../home/components/Home/Home.css';
// import './sections/ProjectVisualization/mtgvis.css';


const ProjectHome = props => {

	return (
		<div id="home" className="projectHome">
			{/* Header */}
			<ProjectHeaderContainer />
			<ProjectVisualization />
			<Modal
				show={props.mindTheGap.modalOpen}
				closeModal={props.handleSetModal.bind(this, { modalOpen: false, nodeId: null })}
				innerFullWidth
			>
				<InfoModalContent />
			</Modal>
		</div>
	);
}

const mapStateToProps = state => ({
	mindTheGap: state.mindTheGap,
});

const mapDispatchToProps = dispatch => ({
	handleSetModal: ({ modalOpen, nodeId }) => {
		console.log(modalOpen, nodeId);
		dispatch(setModal({ modalOpen, nodeId }));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectHome);
