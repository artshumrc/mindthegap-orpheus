import React from 'react';

import ProjectHeaderContainer from '../../../mindthegap/containers/ProjectHeaderContainer';
import ProjectFooterContainer from '../../containers/ProjectFooterContainer';

import './ProjectLayout.css';

const ProjectLayout = props => (
	<div>
		<ProjectHeaderContainer />
		{props.children}
		<ProjectFooterContainer />
	</div>
);

export default ProjectLayout;
