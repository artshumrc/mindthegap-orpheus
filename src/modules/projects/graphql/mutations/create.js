import { gql, graphql } from 'react-apollo';

const projectCreate = gql`
mutation projectCreate($project: ProjectInputType!) {
	projectCreate(project: $project) {
    _id
	}
}
`;

const projectCreateMutation = graphql(projectCreate, {
	props: params => ({
		projectCreate: project => params.projectCreateMutation({
			variables: {
				project,
			},
		}),
	}),
	name: 'projectCreateMutation',
});

export default projectCreateMutation;