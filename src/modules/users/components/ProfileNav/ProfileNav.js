import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';

import './ProfileNav.css';


const ProfileNav = props => {
	const activePath = props.location.pathname;

	return (
		<div className="profileNav">
			<Link
				to="/profile"
				className={
					activePath === '/profile' ?
					"profileNavLinkActive"
					: ''
				}
			>
				<i className="mdi mdi-account" />
				Profile
			</Link>
			<Link
				to="/profile/projects"
				className={
					activePath === '/profile/projects' ?
					"profileNavLinkActive"
					: ''
				}
			>
				<i className="mdi mdi-view-dashboard-variant" />
				Your Projects
			</Link>
		</div>
	);
}

export default withRouter(ProfileNav);
