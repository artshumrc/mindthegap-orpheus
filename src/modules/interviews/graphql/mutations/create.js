import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const interviewCreate = gql`
mutation interviewCreate($hostname: String!, $interview: InterviewInputType!, $files: [FileInputType]) {
	interviewCreate(hostname: $hostname, interview: $interview, files: $files) {
		_id
		title
		slug
		description
	}
}
`;

const interviewCreateMutation = graphql(interviewCreate, {
	props: params => ({
		interviewCreate: (interview, files) => params.interviewCreateMutation({
			variables: {
				interview,
				files,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'interviewCreateMutation',
	options: {
		refetchQueries: ['interviewQuery', 'interviewListQuery'],
	},
});

export default interviewCreateMutation;
