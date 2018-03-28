import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';

// components
import PersonDetail from '../../components/PersonDetail';

// graphql
import personListQuery from '../../graphql/queries/list';
import personDetailQuery from '../../graphql/queries/detail';
import personRemoveMutation from '../../graphql/mutations/remove';


class PersonDetailContainer extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	handleRemove(personId) {
		const { personRemove, router } = this.props;

		personRemove(personId)
			.then((response) => {
				router.replace('/persons');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		let person = [];
		let userIsAdmin = false;

		if (
			this.props.personQuery
			&& this.props.personQuery.project
		) {
			person = this.props.personQuery.project.person;
			userIsAdmin = this.props.personQuery.project.userIsAdmin;
		}

		return (
			<PersonDetail
				{...person}
				userIsAdmin={userIsAdmin}
				handleRemove={this.handleRemove}
			/>
		);
	}
}

export default compose(
	personListQuery, personDetailQuery, personRemoveMutation
)(PersonDetailContainer);
