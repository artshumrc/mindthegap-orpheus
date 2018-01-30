import { gql, graphql } from 'react-apollo';


import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const eventRemove = gql`
	mutation eventRemove($id: String!, $hostname: String!) {
	eventRemove(_id: $id, hostname: $hostname) {
		result
	}
}
`;

const eventRemoveMutation = graphql(eventRemove, {
	props: params => ({
		eventRemove: id => params.eventRemoveMutation({
			variables: {
				id,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'eventRemoveMutation',
	options: {
		refetchQueries: ['eventQuery', 'eventListQuery'],
	},
});

export default eventRemoveMutation;
