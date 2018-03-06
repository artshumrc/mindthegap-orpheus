import React from 'react';

import {
	Sigma, EdgeShapes, NodeShapes, LoadJSON, ForceAtlas2, RelativeSize, RandomizeNodePositions
} from 'react-sigma';


import './ProjectVisualization.css';

const ProjectVisualization = ({ handleToggleInfoModal }) => (
	<div
		className="projectVisualization"
	>
		<Sigma
			renderer="canvas"
			style={{
				height: '100vh',
				width: '100vw',
			}}
			settings={{
				defaultNodeColor: "#ff4e48"
			}}
		>
			<EdgeShapes
				default="curvedArrow"
			/>
			<NodeShapes
				default="circle"
				color="#ff4e48"
			/>
			<LoadJSON path="./upwork.json">
				<RandomizeNodePositions>
					<ForceAtlas2 iterationsPerRender={1} timeout={6000} />
					<RelativeSize initialSize={100} />
				</RandomizeNodePositions>
			</LoadJSON>
		</Sigma>
		<div
			className="clickScreenForDemo"
			onClick={handleToggleInfoModal}
			style={{
				width: '100vw',
				height: '100vh',
				background: 'transparent',
				position: 'fixed',
				zIndex: '90',
				top: '0',
				left: '0',
				right: '0',
				bottom: '0',
			}}
		/>
	</div>
);


export default ProjectVisualization;
