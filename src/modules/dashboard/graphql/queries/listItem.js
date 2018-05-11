import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query listItemQuery($hostname: String, $id: String) {
		project(hostname: $hostname) {
	    _id

			event(_id: $id) {
				_id
        title
        slug
      }

			interview(_id: $id) {
				_id
        title
        slug
      }

			item(_id: $id) {
				_id
        title
        slug
      }
		}
	}
`;


const listItemQuery = graphql(query, {
	name: 'listItemQuery',
	options: ({ _id }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
			id: _id,
		},
	}),
});

export default listItemQuery;
