import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query personItemMetaFieldItemsQuery($hostname: String, $ids: [String]) {
		project(hostname: $hostname) {
	    _id

			items(_ids: $ids) {
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

			interviews(_ids: $ids) {
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

			events(_ids: $ids) {
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

			storymaps(_ids: $ids) {
				_id
				title
				description
				source
			}

		}
	}
`;

const personItemMetaFieldItemsQuery = graphql(query, {
	name: 'personItemMetaFieldItemsQuery',
	options: ({ ids }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
			ids,
		},
	}),
});

export default personItemMetaFieldItemsQuery;
