import { gql, graphql } from 'react-apollo';

const interviewUpdate = gql`
	mutation interviewUpdate($interview: InterviewInputType!, $files: [FileInputType]) {
	interviewUpdate(interview: $interview, files: $files) {
		_id
	}
}
`;

const interviewUpdateMutation = graphql(interviewUpdate, {
	props: params => ({
		interviewUpdate: (interview, files) => params.interviewUpdateMutation({
			variables: {
				interview,
				files,
			},
		}),
	}),
	name: 'interviewUpdateMutation',
	options: {
		refetchQueries: ['interviewQuery', 'interviewListQuery'],
	},
});


export default interviewUpdateMutation;
