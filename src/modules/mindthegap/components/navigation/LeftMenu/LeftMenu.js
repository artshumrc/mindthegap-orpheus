import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

import { toggleLeftMenu } from '../../../../../actions/leftMenu';
import MenuItem from '../../../../../components/navigation/MenuItem';
import MenuSubItem from '../../../../../components/navigation/MenuSubItem';
import LeftMenuHead from '../../../../../components/navigation/LeftMenuHead';

// actions
import { logout, toggleAuthModal } from '../../../../auth/actions';
import { logoutUser } from '../../../../../lib/auth';

// lib
import getCurrentProjectHostname from '../../../../../lib/getCurrentProjectHostname';

import './LeftMenu.css';


class LeftMenu extends React.Component {

	renderMenuItems() {
		const {
			project, closeLeftMenu
		} = this.props;

		return (
			<div>
				<MenuItem
					to="/people"
					onClick={closeLeftMenu}
				>
					People
				</MenuItem>
				{project.userIsAdmin ?
					<div>
						<MenuSubItem
							to="/people"
							onClick={closeLeftMenu}
						>
							List
						</MenuSubItem>
						<MenuSubItem
							to="/people/create"
							onClick={closeLeftMenu}
							last
						>
							Create
						</MenuSubItem>
					</div>
				: ''}

				<MenuItem
					to="/interviews"
					onClick={closeLeftMenu}
				>
					Interviews
				</MenuItem>
				{project.userIsAdmin ?
					<div>
						<MenuSubItem
							to="/interviews"
							onClick={closeLeftMenu}
						>
							List
						</MenuSubItem>
						<MenuSubItem
							to="/interviews/create"
							onClick={closeLeftMenu}
							last
						>
							Create
						</MenuSubItem>
					</div>
				: ''}

				<MenuItem
					to="/events"
					onClick={closeLeftMenu}
				>
					Events
				</MenuItem>
				{project.userIsAdmin ?
					<div>
						<MenuSubItem
							to="/events"
							onClick={closeLeftMenu}
						>
							List
						</MenuSubItem>
						<MenuSubItem
							to="/events/create"
							onClick={closeLeftMenu}
							last
						>
							Create
						</MenuSubItem>
					</div>
				: ''}

				<MenuItem
					to="/items"
					onClick={closeLeftMenu}
				>
					Items
				</MenuItem>
				{project.userIsAdmin ?
					<div>
						<MenuSubItem
							to="/items"
							onClick={closeLeftMenu}
						>
							List
						</MenuSubItem>
						<MenuSubItem
							to="/items/create"
							onClick={closeLeftMenu}
							last
						>
							Create
						</MenuSubItem>
					</div>
				: ''}

				{project.userIsAdmin ?
					<div>
						<MenuItem
							to="/dashboard"
							onClick={closeLeftMenu}
						>
							Dashboard
						</MenuItem>
						<MenuItem
							to="/dashboard/settings"
							onClick={closeLeftMenu}
						>
							Settings
						</MenuItem>
					</div>
				: ''}
			</div>
		);
	}

	render() {
		const {
			project, leftMenuOpen, closeLeftMenu, userId, dispatchLogout,
			dispatchToggleAuthModal
		} = this.props;

		let isMainOrpheusProject = false;
		const hostname = getCurrentProjectHostname();

		if (!hostname || ~['orphe.us', 'orpheus.local'].indexOf(hostname)) {
			isMainOrpheusProject = true;
		}

		if (!project) {
			return null;
		}
		return (
			<Drawer
				open={leftMenuOpen}
				docked={false}
				onRequestChange={closeLeftMenu}
				className="leftMenu"
			>
				<LeftMenuHead />
				<div className="leftMenuContent">
					<MenuItem
						to="/"
						onClick={closeLeftMenu}
					>
						Home
					</MenuItem>
					{!isMainOrpheusProject ?
						this.renderMenuItems()
					: ''}
					<Divider />

					{userId ?
						<div>
							<MenuItem
								to="/profile"
								onClick={closeLeftMenu}
							>
								Profile
							</MenuItem>
							<MenuItem
								to="/"
								onClick={dispatchLogout}
							>
								Sign out
							</MenuItem>
						</div>
					:
						<MenuItem
							onClick={dispatchToggleAuthModal}
						>
							Sign up / in
						</MenuItem>
					}
				</div>
			</Drawer>

		);
	}
}


LeftMenu.propTypes = {
	project: PropTypes.object,
	leftMenuOpen: PropTypes.bool,
	closeLeftMenu: PropTypes.func,
};

LeftMenu.defaultProps = {
	project: {
		userIsAdmin: false,
	},
};

const mapStateToProps = (state, props) => ({
	leftMenuOpen: state.leftMenu.open,
	userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	closeLeftMenu: () => {
		dispatch(toggleLeftMenu(false));
	},
	dispatchLogout: () => {
		dispatch(logout(logoutUser));
		dispatch(toggleLeftMenu(false));
	},
	dispatchToggleAuthModal: () => {
		dispatch(toggleAuthModal());
		dispatch(toggleLeftMenu(false));
	},
});


export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LeftMenu);
