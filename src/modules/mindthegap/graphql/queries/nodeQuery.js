import { gql, graphql } from 'react-apollo';

const query = gql`
	query nodeQuery($id: String) {
		node(_id: $id) {
			_id
			title
			slug
			description
			projectId
      collectionType

			events
			interviews
			items

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

			commentsCount
			comments {
				_id
				userId
				itemId
				content
				updatedAt
			}

			manifest {
				_id
			}
		}
	}
`;

const nodeQuery = graphql(query, {
	name: 'nodeQuery',
	options: ({ nodeId }) => ({
		variables: {
			id: nodeId,
		}
	}),
});

export default nodeQuery;
