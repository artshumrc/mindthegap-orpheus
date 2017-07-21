import { graphqlExpress, graphiqlExpress  } from 'graphql-server-express';
import { formatError } from 'apollo-errors';
import { GraphQLSchema, execute, subscribe } from 'graphql';
import { maskErrors } from 'graphql-errors';
import { createServer } from 'http';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import jwt from 'jsonwebtoken';

import RootQuery from './graphql/queries/rootQuery';
import RootMutation from './graphql/mutations/rootMutation';
import RootSubscription from './graphql/subscriptions/rootSubscription';

// bll
import Users from './bll/users';


/**
 * Root schema
 * @type {GraphQLSchema}
 */
const RootSchema = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
	subscription: RootSubscription,
});

// mask error messages
maskErrors(RootSchema);

// TODO should be moved to something more scalable horizontally like Redis, MQTT
export const pubsub = new PubSub();


/**
 * Set up the graphQL HTTP endpoint
 * @param  {Object} app 	express app instance
 */
export default function setupGraphql(app) {

	app.use('/graphql', graphqlExpress({
		schema: RootSchema,
		formatError,
	}));

	app.use('/graphiql', graphiqlExpress({
		endpointURL: '/graphql',
		subscriptionsEndpoint: `ws://${process.env.WS_SERVER_HOST}:${process.env.WS_SERVER_PORT}/${process.env.WS_SERVER_URI}`
	}));

	// Wrap the Express server
	const ws = createServer(app);
	ws.listen(process.env.WS_SERVER_PORT, () => {
		console.log(`GraphQL WebSocket Server is now running on ws://${process.env.WS_SERVER_HOST}:${process.env.WS_SERVER_PORT}`);
		// Set up the WebSocket for handling GraphQL subscriptions
		const subscriptionsServer = new SubscriptionServer({
			execute,
			subscribe,
			schema: RootSchema,
			onConnect: async (connectionParams, webSocket) => {
				// validate user token on connection
				if (connectionParams.authToken) {
					const token = connectionParams.authToken.slice(4); // remove JWT from the start of the string
					try {
						const decoded = await jwt.verify(token, process.env.JWT_SECRET);
						const user = await Users.findById(decoded._id);
						if (user) return { user };
						throw new Error('Not authorized');
					} catch (err) {
						console.error(err);
						throw new Error('Error while processing token');
					}
				}
				throw new Error('Missing auth token!');
			},
			onDisconnect: (webSocket) => {
				console.log('disconected');
			}
		}, {
			server: ws,
			path: '/subscriptions',
		});
	});
}
