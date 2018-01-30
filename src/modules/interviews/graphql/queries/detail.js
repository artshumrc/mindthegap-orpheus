import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query interviewQuery($hostname: String, $id: String) {
		project(hostname: $hostname) {
	    _id
			userIsAdmin
			interview(_id: $id) {
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

const interviewQuery = graphql(query, {
	name: 'interviewQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
			id: params.id,
		}
	}),
});

export default interviewQuery;
