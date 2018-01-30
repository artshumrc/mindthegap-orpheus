import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const personCreate = gql`
mutation personCreate($hostname: String!, $person: PersonInputType!, $files: [FileInputType]) {
	personCreate(hostname: $hostname, person: $person, files: $files) {
		_id
		title
		slug
		description
	}
}
`;

const personCreateMutation = graphql(personCreate, {
	props: params => ({
		personCreate: (person, files) => params.personCreateMutation({
			variables: {
				person,
				files,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'personCreateMutation',
	options: {
		refetchQueries: ['personQuery', 'personListQuery'],
	},
});

export default personCreateMutation;
