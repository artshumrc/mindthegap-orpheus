import { gql, graphql } from 'react-apollo';

const query = gql`
	query graphDataQuery {
	  project(hostname:"mindthegap.orphe.us") {
	    _id
	    title
	    items {
	      _id
	      title

				metadata {
				  type
				  value
				  label
				}
	    }
	  }
	}
`;

const graphDataQuery = graphql(query, {
	name: 'graphDataQuery',
});

export default graphDataQuery;
