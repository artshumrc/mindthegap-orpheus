import { gql, graphql } from 'react-apollo';

// quick hack for getting this working not using PersonInputType
// TODO: use PersonInputType

const personUpdate = gql`
	mutation personUpdate($person: PersonInputType!, $files: [FileInputType]) {
	personUpdate(person: $person, files: $files) {
		_id
	}
}
`;

const personUpdateMutation = graphql(personUpdate, {
	props: params => ({
		personUpdate: (person, files) => params.personUpdateMutation({
			variables: {
				person,
				files,
			},
		}),
	}),
	name: 'personUpdateMutation',
	options: {
		refetchQueries: ['personQuery', 'personListQuery'],
	},
});


export default personUpdateMutation;
