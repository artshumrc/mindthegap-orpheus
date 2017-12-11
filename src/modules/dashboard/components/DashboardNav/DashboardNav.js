import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';

import './DashboardNav.css';


const DashboardNav = props => {
	const activePath = props.location.pathname;

	return (
		<div className="dashboardNav">
			<Link
				to="/dashboard"
				className={
					activePath === '/dashboard' ?
					"dashboardNavLinkActive"
					: ''
				}
			>
				<i className="mdi mdi-view-dashboard" />
				Dashboard
			</Link>
			<Link
				to="/dashboard/settings"
				className={
					activePath === '/dashboard/settings' ?
					"dashboardNavLinkActive"
					: ''
				}
			>
				<i className="mdi mdi-settings" />
				Settings
			</Link>
			<Link
				to="/dashboard/people"
				className={
					activePath === '/dashboard/people' ?
					"dashboardNavLinkActive"
					: ''
				}
			>
				<i className="mdi mdi-account-multiple" />
				Members
			</Link>
			<Link
				to="/dashboard/help"
				className={
					activePath === '/dashboard/help' ?
					"dashboardNavLinkActive"
					: ''
				}
			>
				<i className="mdi mdi-information-outline" />
				Support
			</Link>
		</div>
	);
}

export default withRouter(DashboardNav);