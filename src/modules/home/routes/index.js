import React from 'react';
import { Route } from 'react-router';


// project home
import ProjectVisualization from '../../projects/components/ProjectHome/sections/ProjectVisualization';


export default (
	<div>
		<Route
			exact
			path="/"
			component={ProjectVisualization}
		/>
	</div>
);
