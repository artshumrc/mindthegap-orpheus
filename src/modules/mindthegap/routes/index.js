import React from 'react';
import { Route } from 'react-router';


// project home
import ProjectVisualization from '../components/ProjectHome/sections/ProjectVisualization';


export default (
	<div>
		<Route
			exact
			path="/"
			component={ProjectVisualization}
		/>
	</div>
);
