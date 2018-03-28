import { gql, graphql } from 'react-apollo';

import getCurrentProjectHostname from '../../../../lib/getCurrentProjectHostname';


const eventCreate = gql`
mutation eventCreate($hostname: String!, $event: EventInputType!, $files: [FileInputType]) {
	eventCreate(hostname: $hostname, event: $event, files: $files) {
		_id
	}
}
`;

const eventCreateMutation = graphql(eventCreate, {
	props: params => ({
		eventCreate: (event, files) => params.eventCreateMutation({
			variables: {
				event,
				files,
				hostname: getCurrentProjectHostname(),
			},
		}),
	}),
	name: 'eventCreateMutation',
	options: {
		refetchQueries: ['eventQuery', 'eventListQuery'],
	},
});

export default eventCreateMutation;
