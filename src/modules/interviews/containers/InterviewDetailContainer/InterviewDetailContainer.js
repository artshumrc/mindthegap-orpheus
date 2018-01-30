import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';

// components
import InterviewDetail from '../../components/InterviewDetail';

// graphql
import interviewListQuery from '../../graphql/queries/list';
import interviewDetailQuery from '../../graphql/queries/detail';
import interviewRemoveMutation from '../../graphql/mutations/remove';


class InterviewDetailContainer extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	handleRemove(interviewId) {
		const { interviewRemove, router } = this.props;

		interviewRemove(interviewId)
			.then((response) => {
				router.replace('/interviews');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		let interview = [];
		let userIsAdmin = false;

		if (
			this.props.interviewQuery
			&& this.props.interviewQuery.project
		) {
			interview = this.props.interviewQuery.project.interview;
			userIsAdmin = this.props.interviewQuery.project.userIsAdmin;
		}

		return (
			<InterviewDetail
				{...interview}
				userIsAdmin={userIsAdmin}
				handleRemove={this.handleRemove}
			/>
		);
	}
}

export default compose(
	interviewListQuery, interviewDetailQuery, interviewRemoveMutation
)(InterviewDetailContainer);
