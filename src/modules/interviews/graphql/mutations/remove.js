import { gql, graphql } from 'react-apollo';


import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const interviewRemove = gql`
	mutation interviewRemove($id: String!, $hostname: String!) {
	interviewRemove(_id: $id, hostname: $hostname) {
		result
	}
}
`;

const interviewRemoveMutation = graphql(interviewRemove, {
	props: params => ({
		interviewRemove: id => params.interviewRemoveMutation({
			variables: {
				id,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'interviewRemoveMutation',
	options: {
		refetchQueries: ['interviewQuery', 'interviewListQuery'],
	},
});

export default interviewRemoveMutation;
