import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query eventQuery($hostname: String, $id: String) {
		project(hostname: $hostname) {
	    _id
			userIsAdmin
			event(_id: $id) {
				_id
				title
				slug
				description
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

const eventQuery = graphql(query, {
	name: 'eventQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
			id: params.id,
		}
	}),
});

export default eventQuery;
