import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';

// components
import PersonDetail from '../../components/PersonDetail';

// graphql
import itemListQuery from '../../graphql/queries/list';
import itemDetailQuery from '../../graphql/queries/detail';
import itemRemoveMutation from '../../graphql/mutations/remove';


class PersonDetailContainer extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	handleRemove(itemId) {
		const { itemRemove, router } = this.props;

		itemRemove(itemId)
			.then((response) => {
				router.replace('/items');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		let item = [];
		let userIsAdmin = false;

		if (
			this.props.itemQuery
			&& this.props.itemQuery.project
		) {
			item = this.props.itemQuery.project.item;
			userIsAdmin = this.props.itemQuery.project.userIsAdmin;
		}

		return (
			<PersonDetail
				{...item}
				userIsAdmin={userIsAdmin}
				handleRemove={this.handleRemove}
			/>
		);
	}
}

export default compose(
	itemListQuery, itemDetailQuery, itemRemoveMutation
)(PersonDetailContainer);
