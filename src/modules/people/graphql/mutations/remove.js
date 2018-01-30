import { gql, graphql } from 'react-apollo';


import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const personRemove = gql`
	mutation personRemove($id: String!, $hostname: String!) {
	personRemove(_id: $id, hostname: $hostname) {
		result
	}
}
`;

const personRemoveMutation = graphql(personRemove, {
	props: params => ({
		personRemove: id => params.personRemoveMutation({
			variables: {
				id,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'personRemoveMutation',
	options: {
		refetchQueries: ['personQuery', 'personListQuery'],
	},
});

export default personRemoveMutation;
