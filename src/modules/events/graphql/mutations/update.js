import { gql, graphql } from 'react-apollo';

const eventUpdate = gql`
	mutation eventUpdate($event: EventInputType!, $files: [FileInputType]) {
	eventUpdate(event: $event, files: $files) {
		_id
	}
}
`;

const eventUpdateMutation = graphql(eventUpdate, {
	props: params => ({
		eventUpdate: (event, files) => params.eventUpdateMutation({
			variables: {
				event,
				files,
			},
		}),
	}),
	name: 'eventUpdateMutation',
	options: {
		refetchQueries: ['eventQuery', 'eventListQuery'],
	},
});


export default eventUpdateMutation;
