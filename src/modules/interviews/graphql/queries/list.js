import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const query = gql`
	query interviewListQuery($hostname: String) {
		project(hostname: $hostname) {
	    _id
			interviews {
				_id
				title
				slug
				description
				files {
					_id
					name
				}
			}
			
			interviewsCount
		}
	}
`;

const interviewListQuery = graphql(query, {
	name: 'interviewListQuery',
	options: ({ params }) => ({
		variables: {
			hostname: getCurrentProjectHostname(),
		}
	}),
});

export default interviewListQuery;
