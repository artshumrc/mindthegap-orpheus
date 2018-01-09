import React from 'react';
import { Route } from 'react-router';

// project home
import ProjectHomeContainer from '../containers/ProjectHomeContainer';


export default (
	<div>
		<Route
			exact
			path="/"
			component={ProjectHomeContainer}
		/>
	</div>
);
