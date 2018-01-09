import React from 'react';
import { Link, withRouter } from 'react-router';

import './DashboardNav.css';


const DashboardNav = (props) => {
	const activePath = props.location.pathname;

	return (
		<div className="dashboardNav">
			<Link
				to="/dashboard"
				className={
					activePath === '/dashboard' ?
					'dashboardNavLinkActive'
					: ''
				}
			>
				<i className="mdi mdi-view-dashboard" />
				Dashboard
			</Link>
			<div className="navLinkWithDropdown">
				<Link
					to="/create"
					className={`
						dashboardNavLinkWithDropdown
						${activePath === '/people/create' ?
						'dashboardNavLinkActive'
						: ''}
					`}
				>
					<i className="mdi mdi-plus" />
					Create
				</Link>
				<div className="dropdownContent">
					<Link
						to="/people/create"
						className={`
							dropdownLink
							${activePath === '/people/create' ?
							'dashboardNavLinkActive'
							: ''}
						`}
					>
						People
					</Link>
					<Link
						to="/interviews/create"
						className={`
							dropdownLink
							${activePath === '/interviews/create' ?
							'dashboardNavLinkActive'
							: ''}
						`}
					>
						Interview
					</Link>
					<Link
						to="/events/create"
						className={`
							dropdownLink
							${activePath === '/texts/create' ?
							'dashboardNavLinkActive'
							: ''}
						`}
					>
						Event
					</Link>
					<Link
						to="/items/create"
						className={`
							dropdownLink
							${activePath === '/items/create' ?
							'dashboardNavLinkActive'
							: ''}
						`}
					>
						Item
					</Link>
				</div>
			</div>
			<Link
				to="/dashboard/settings"
				className={
					activePath === '/dashboard/settings' ?
					'dashboardNavLinkActive'
					: ''
				}
			>
				<i className="mdi mdi-settings" />
				Settings
			</Link>
			<div className="navLinkWithDropdown">
				<Link
					to="/dashboard/people"
					className={`
						dashboardNavLinkWithDropdown
						${activePath === '/dashboard/people' ?
						'dashboardNavLinkActive'
						: ''}
					`}
				>
					<i className="mdi mdi-account-multiple" />
					People
				</Link>
				<div className="dropdownContent">
					<Link
						to="/dashboard/people/invite"
						className={`
							dropdownLink
							${activePath === '/dashboard/people/invite' ?
							'dashboardNavLinkActive'
							: ''}
						`}
					>
						Invite
					</Link>
				</div>
			</div>
			{/*
			<Link
				to="/dashboard/help"
				className={
					activePath === '/dashboard/help' ?
					'dashboardNavLinkActive'
					: ''
				}
			>
				<i className="mdi mdi-information-outline" />
				Support
			</Link>
			*/}
		</div>
	);
};

export default withRouter(DashboardNav);
