import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query personListQuery($hostname: String) {
		project(hostname: $hostname) {
	    _id
			people {
				_id
				name
				slug
				dateBirth
				dateDeath
				bio
				files {
					_id
					type
					name
				}
			}

			peopleCount

			files {
				_id
				type
				name
			}
		}
	}
`;

const personListQuery = graphql(query, {
	name: 'personListQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
		}
	}),
});

export default personListQuery;
