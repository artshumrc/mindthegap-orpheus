import React from 'react';


import './ProjectVisualization.css';

const ProjectVisualization = props => (
	<div className="projectVisualization">

		<div
			style={{
				width: '100vw',
				height: '100vh',
				background: 'url(/images/example_data_visualization.png)',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}}
		/>
	</div>
);


export default ProjectVisualization;
