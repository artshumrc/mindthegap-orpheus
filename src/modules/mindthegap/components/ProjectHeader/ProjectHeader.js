import React from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components
import LeftMenu from '../navigation/LeftMenu';
import UserAvatarContainer from '../../../users/containers/UserAvatarContainer';

// actions
import * as authActions from '../../../auth/actions';
import { toggleLeftMenu } from '../../../../actions/leftMenu';


import './ProjectHeader.css';

const ProjectHeader = ({ project, toggleAuthModal, dispatchToggleLeftMenu, leftMenuOpen, userId }) => {

	if (!project) {
		return null;
	}

	return (
		<div>
			<LeftMenu project={project} />
			<Headroom
				className="navbar projectNavbar"
				style={{
					background: '#fff',
				}}
			>
				<div className="nav-header">
					<i
						className="mdi mdi-menu left-menu-toggle-icon"
						onClick={dispatchToggleLeftMenu.bind(this, !leftMenuOpen)}
					/>
					{project ?
						<Link
							to="/"
						>
							<h2 className="site-title">
								{project.title}
							</h2>
						</Link>
					: ''}
				</div>
				<ul className="nav">
					{project.userIsAdmin ?
						<li>
							<Link
								to="/dashboard"
							>
								Dashboard
							</Link>
						</li>
					: ''}
					<li>
						<Link to="/people" >
							People
						</Link>
					</li>
					<li>
						<Link to="/interviews" >
							Interviews
						</Link>
					</li>
					<li>
						<Link to="/events" >
							Events
						</Link>
					</li>
					<li>
						<Link to="/items" >
							Items
						</Link>
					</li>
					<li>
						{ userId ?
							<Link
								to={'/profile'}
								className="userAvatarLink"
							>
								<UserAvatarContainer />
							</Link>
						: '' }
					</li>
					<li>
						{!userId ?
							<Link
								to={'/'}
								className="login-button"
								onClick={toggleAuthModal}
							>
								Sign Up / In
							</Link>
						: '' }
					</li>
					<li>
						<Link
							className="searchLink"
							to="/"
						>
							<i className="mdi mdi-magnify searchIcon" />
						</Link>
					</li>
				</ul>
			</Headroom>
		</div>
	);
}

ProjectHeader.propTypes = {
	project: PropTypes.object,
	toggleAuthModal: PropTypes.func.isRequired,
	userId: PropTypes.string,
};

ProjectHeader.defaultProps = {
	userId: null
};

const mapStateToProps = state => ({
	userId: state.auth.userId,
	leftMenuOpen: state.leftMenu.open,
});

const mapDispatchToProps = dispatch => ({
	toggleAuthModal: (e) => {
		e.preventDefault();
		dispatch(authActions.toggleAuthModal());
	},
	dispatchToggleLeftMenu: (open) => {
		dispatch(toggleLeftMenu(open));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectHeader);
