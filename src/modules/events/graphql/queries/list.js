import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query eventListQuery($hostname: String) {
		project(hostname: $hostname) {
	    _id
			events {
				_id
				title
				slug
				description
				files {
					_id
					type
					name
				}
			}

			eventsCount

			files {
				_id
				type
				name
			}
		}
	}
`;

const eventListQuery = graphql(query, {
	name: 'eventListQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
		}
	}),
});

export default eventListQuery;
