import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import _ from 'underscore';

import PersonList from '../../components/PersonList';
import personListQuery from '../../graphql/queries/list';


class PersonListContainer extends React.Component {
	render() {
		let people = [];

		if (
			this.props.personListQuery
			&& this.props.personListQuery.project
		) {
			people = this.props.personListQuery.project.people;
		}

		if (people.length && this.props.limit && this.props.random) {
			let _people = [];

			for (let i = 0; i < this.props.limit; i++){
				_people.push(_.sample(people));
			}
			people = _people;
		}

		return (
			<PersonList
				people={people}
			/>
		);
	}
}

PersonListContainer.propTypes = {
	personListQuery: PropTypes.object,
};

export default compose(
	personListQuery,
)(PersonListContainer);
