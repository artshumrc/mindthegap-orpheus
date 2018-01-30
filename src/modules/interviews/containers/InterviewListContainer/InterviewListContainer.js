import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import _ from 'underscore';

import InterviewList from '../../components/InterviewList';
import interviewListQuery from '../../graphql/queries/list';


class InterviewListContainer extends React.Component {
	render() {
		let interviews = [];

		if (
			this.props.interviewListQuery
			&& this.props.interviewListQuery.project
		) {
			interviews = this.props.interviewListQuery.project.interviews;
		}

		if (interviews.length && this.props.limit && this.props.random) {
			let _interviews = [];

			for (let i = 0; i < this.props.limit; i++){
				_interviews.push(_.sample(interviews));
			}
			interviews = _interviews;
		}

		return (
			<InterviewList
				interviews={interviews}
			/>
		);
	}
}

InterviewListContainer.propTypes = {
	interviewListQuery: PropTypes.object,
};

export default compose(
	interviewListQuery,
)(InterviewListContainer);
