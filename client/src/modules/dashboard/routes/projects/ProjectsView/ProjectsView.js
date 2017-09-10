import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import './ProjectsView.css';

import Project from './Project';

class ProjectsView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentWillReceiveProps(nextProps) {
		const { loading } = this.state;
		if (nextProps.data.loading !== loading) {
			this.setState({
				loading: !loading
			});
		}
	}

	render() {
		const { data } = this.props;
		return (
			<div>
				{
					!data.loading ?
						<div id="projects-view">
							<div>
								<span>My Projects</span>
							</div>
							<div>
								{ data.userProjects && data.userProjects.length > 0 ?
									<div>
										{
											data.userProjects.map(project => (
												<Project
													key={project._id}
													projectData={project}
												/>
											))
										}
									</div>
									:
									<div>
										<h1>You do not have any projects.</h1>
									</div>
								}
							</div>
						</div>
					:
						<div>
							<h2>loading</h2>
						</div>
				}
			</div>
		);
	}
}

ProjectsView.propTypes = {
	data: PropTypes.shape({
		userProjects: PropTypes.arrayOf(PropTypes.object),
		loading: PropTypes.bool
	}).isRequired
};

const userProjects = gql`
query {
  userProjects {
    title,
    description,
		createdAt,
		_id
  }
}
`;

export default graphql(userProjects)(ProjectsView);
