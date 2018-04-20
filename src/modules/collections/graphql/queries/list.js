import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query collectionListQuery($hostname: String) {
		project(hostname: $hostname) {
	    _id
			collections {
				_id
				title
				slug
				description
				coverImage
				itemsCount
			}
			files {
				_id
				type
				name
			}
		}
	}
`;

const collectionListQuery = graphql(query, {
	name: 'collectionListQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
		}
	}),
});

export default collectionListQuery;
