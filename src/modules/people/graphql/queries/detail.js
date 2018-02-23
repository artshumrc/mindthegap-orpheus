import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query personQuery($hostname: String, $id: String) {
		project(hostname: $hostname) {
	    _id
			userIsAdmin
			person(_id: $id) {
				_id
				name
				slug
				bio
				projectId

				metadata {
					type
					label
					value
				}

				files {
					_id
					name
					title
					type
					path
				}

				manifest {
					_id
				}
			}
		}
	}
`;

const personQuery = graphql(query, {
	name: 'personQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
			id: params.id,
		}
	}),
});

export default personQuery;
