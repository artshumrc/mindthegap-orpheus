import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Recaptcha from 'react-recaptcha';

import ProjectNameAvailabilityCheckContainer from '../../containers/ProjectNameAvailabilityCheckContainer';

import './ProjectCreate.css';


const ProjectCreate = props => (
	<div className="projectCreate">
		<h1>Create a new project</h1>

		<hr />

		<ProjectNameAvailabilityCheckContainer
			params={{
				hostname: props.projectHostname
			}}
			onChange={props.onChange}
			onSubmit={props.onSubmit}
			verifyCaptcha={props.verifyCaptcha}
			captchaVerified={props.captchaVerified}
		/>
	</div>
);


export default ProjectCreate;