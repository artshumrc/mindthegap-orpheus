import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query projectCoverQuery($hostname: String) {
		project(hostname: $hostname) {
	    _id
			title
			subtitle
			description
			files {
				_id
				type
				name
			}
		}
	}
`;

const projectCoverQuery = graphql(query, {
	name: 'projectCoverQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
		}
	}),
});

export default projectCoverQuery;
